// Google Drive Integration
// Configuration - Replace with your own Google API credentials
const GOOGLE_CONFIG = {
    clientId: 'YOUR_CLIENT_ID.apps.googleusercontent.com',
    apiKey: 'YOUR_API_KEY',
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
    scope: 'https://www.googleapis.com/auth/drive.file'
};

let gapiInited = false;
let gisInited = false;
let tokenClient;

// Initialize Google API
function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
}

async function initializeGapiClient() {
    await gapi.client.init({
        apiKey: GOOGLE_CONFIG.apiKey,
        discoveryDocs: GOOGLE_CONFIG.discoveryDocs,
    });
    gapiInited = true;
    maybeEnableButtons();
}

// Initialize Google Identity Services
function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CONFIG.clientId,
        scope: GOOGLE_CONFIG.scope,
        callback: '', // defined later
    });
    gisInited = true;
    maybeEnableButtons();
}

function maybeEnableButtons() {
    if (gapiInited && gisInited) {
        console.log('Google Drive API ready');
    }
}

// Handle authorization
function handleAuthClick(callback) {
    tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
            throw (resp);
        }
        callback();
    };

    if (gapi.client.getToken() === null) {
        // Prompt the user to select a Google Account and ask for consent
        tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
        // Skip display of account chooser and consent dialog
        tokenClient.requestAccessToken({ prompt: '' });
    }
}

// Upload PDF to Google Drive
async function uploadPDFToGoogleDrive(pdfBlob, fileName) {
    const metadata = {
        name: fileName,
        mimeType: 'application/pdf'
    };

    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', pdfBlob);

    try {
        const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
            method: 'POST',
            headers: new Headers({ 'Authorization': 'Bearer ' + gapi.auth.getToken().access_token }),
            body: form
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error uploading to Google Drive:', error);
        throw error;
    }
}

// Generate and upload PDF to Google Drive
function generateAndUploadPDF() {
    handleAuthClick(async () => {
        try {
            // Show loading state
            const uploadBtn = document.getElementById('uploadToDriveBtn');
            if (uploadBtn) {
                uploadBtn.disabled = true;
                uploadBtn.textContent = '📤 Uploading...';
            }

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

            // Get PDF as blob
            const pdfBlob = doc.output('blob');
            const fileName = `Sale_Profit_Report_${new Date().toISOString().slice(0, 10)}.pdf`;

            // Upload to Google Drive
            const result = await uploadPDFToGoogleDrive(pdfBlob, fileName);
            
            if (result.id) {
                alert(`✅ PDF successfully uploaded to Google Drive!\n\nFile: ${result.name}\nFile ID: ${result.id}`);
            }

            // Reset button state
            if (uploadBtn) {
                uploadBtn.disabled = false;
                uploadBtn.textContent = '📤 Upload to Google Drive';
            }

        } catch (error) {
            console.error('Error:', error);
            alert('❌ Error uploading to Google Drive: ' + error.message);
            
            // Reset button state
            const uploadBtn = document.getElementById('uploadToDriveBtn');
            if (uploadBtn) {
                uploadBtn.disabled = false;
                uploadBtn.textContent = '📤 Upload to Google Drive';
            }
        }
    });
}

// Sign out
function handleSignoutClick() {
    const token = gapi.client.getToken();
    if (token !== null) {
        google.accounts.oauth2.revoke(token.access_token);
        gapi.client.setToken('');
        alert('Signed out from Google Drive');
    }
}
