// PDF Generation
function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Get the report date
    const reportDateInput = document.getElementById('reportDate').value;
    let reportDate = 'Not Set';
    
    if (reportDateInput) {
        const dateObj = new Date(reportDateInput);
        reportDate = dateObj.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }

    let yPosition = 20;

    // Title
    doc.setFontSize(18);
    doc.setFont(undefined, 'bold');
    doc.text('Sale Profit Management Report', 105, yPosition, { align: 'center' });
    yPosition += 10;

    // Report Date
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text(`Report Date: ${reportDate}`, 105, yPosition, { align: 'center' });
    yPosition += 7;

    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, yPosition, { align: 'center' });
    yPosition += 15;

    // Phone Chart
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Phone Chart', 14, yPosition);
    yPosition += 5;

    const phoneTableData = phoneData.map(entry => [
        entry.model,
        entry.imei,
        entry.colour,
        entry.owner,
        entry.revenue.toFixed(2),
        entry.cost.toFixed(2),
        entry.profit.toFixed(2),
        entry.thabrew.toFixed(2),
        entry.kelan.toFixed(2)
    ]);

    let phoneTotals = phoneData.reduce((acc, entry) => ({
        revenue: acc.revenue + entry.revenue,
        cost: acc.cost + entry.cost,
        profit: acc.profit + entry.profit,
        thabrew: acc.thabrew + entry.thabrew,
        kelan: acc.kelan + entry.kelan
    }), { revenue: 0, cost: 0, profit: 0, thabrew: 0, kelan: 0 });

    phoneTableData.push([
        'TOTAL', '', '', '',
        phoneTotals.revenue.toFixed(2),
        phoneTotals.cost.toFixed(2),
        phoneTotals.profit.toFixed(2),
        phoneTotals.thabrew.toFixed(2),
        phoneTotals.kelan.toFixed(2)
    ]);

    doc.autoTable({
        startY: yPosition,
        head: [['Model', 'IMEI', 'Colour', 'Owner', 'Revenue', 'Cost', 'Profit', 'Thabrew', 'Kelan']],
        body: phoneTableData,
        theme: 'grid',
        headStyles: { fillColor: [59, 130, 246] },
        footStyles: { fillColor: [34, 197, 94], fontStyle: 'bold' }
    });

    yPosition = doc.lastAutoTable.finalY + 15;

    // Accessories Chart
    if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
    }

    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Accessories Chart', 14, yPosition);
    yPosition += 5;

    const accessoryTableData = accessoryData.map(entry => [
        entry.model,
        entry.revenue.toFixed(2),
        entry.cost.toFixed(2),
        entry.profit.toFixed(2),
        entry.thabrew.toFixed(2),
        entry.kelan.toFixed(2)
    ]);

    let accessoryTotals = accessoryData.reduce((acc, entry) => ({
        revenue: acc.revenue + entry.revenue,
        cost: acc.cost + entry.cost,
        profit: acc.profit + entry.profit,
        thabrew: acc.thabrew + entry.thabrew,
        kelan: acc.kelan + entry.kelan
    }), { revenue: 0, cost: 0, profit: 0, thabrew: 0, kelan: 0 });

    accessoryTableData.push([
        'TOTAL',
        accessoryTotals.revenue.toFixed(2),
        accessoryTotals.cost.toFixed(2),
        accessoryTotals.profit.toFixed(2),
        accessoryTotals.thabrew.toFixed(2),
        accessoryTotals.kelan.toFixed(2)
    ]);

    doc.autoTable({
        startY: yPosition,
        head: [['Model', 'Revenue', 'Cost', 'Profit', 'Thabrew', 'Kelan']],
        body: accessoryTableData,
        theme: 'grid',
        headStyles: { fillColor: [59, 130, 246] },
        footStyles: { fillColor: [34, 197, 94], fontStyle: 'bold' }
    });

    yPosition = doc.lastAutoTable.finalY + 15;

    // Thabrew Profit Chart
    if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
    }

    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Thabrew Profit', 14, yPosition);
    yPosition += 5;

    const thabrewTableData = thabrewData.map(entry => [
        entry.description,
        entry.amount.toFixed(2)
    ]);

    let thabrewTotal = thabrewData.reduce((acc, entry) => acc + entry.amount, 0);
    thabrewTableData.push(['TOTAL', thabrewTotal.toFixed(2)]);

    doc.autoTable({
        startY: yPosition,
        head: [['Description', 'Amount']],
        body: thabrewTableData,
        theme: 'grid',
        headStyles: { fillColor: [22, 163, 74] },
        footStyles: { fillColor: [134, 239, 172], fontStyle: 'bold' }
    });

    yPosition = doc.lastAutoTable.finalY + 15;

    // Kelan Profit Chart
    if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
    }

    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Kelan Profit', 14, yPosition);
    yPosition += 5;

    const kelanTableData = kelanData.map(entry => [
        entry.description,
        entry.amount.toFixed(2)
    ]);

    let kelanTotal = kelanData.reduce((acc, entry) => acc + entry.amount, 0);
    kelanTableData.push(['TOTAL', kelanTotal.toFixed(2)]);

    doc.autoTable({
        startY: yPosition,
        head: [['Description', 'Amount']],
        body: kelanTableData,
        theme: 'grid',
        headStyles: { fillColor: [147, 51, 234] },
        footStyles: { fillColor: [216, 180, 254], fontStyle: 'bold' }
    });

    // Save the PDF
    doc.save(`Sale_Profit_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
}
