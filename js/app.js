// Data storage
let phoneData = [];
let accessoryData = [];
let thabrewData = [];
let kelanData = [];

// Phone Chart Functions
function addPhoneEntry() {
    const model = document.getElementById('phoneModel').value;
    const imei = document.getElementById('phoneImei').value;
    const colour = document.getElementById('phoneColour').value;
    const owner = document.getElementById('phoneOwner').value;
    const revenue = parseFloat(document.getElementById('phoneRevenue').value) || 0;
    const cost = parseFloat(document.getElementById('phoneCost').value) || 0;

    if (!model || !imei || !colour || !owner) {
        alert('Please fill in all phone details');
        return;
    }

    const profit = revenue === 0 ? 0 : revenue - cost;
    const thabrew = profit * 0.8;
    const kelan = profit * 0.2;

    phoneData.push({ model, imei, colour, owner, revenue, cost, profit, thabrew, kelan });
    
    renderPhoneTable();
    updateOwnerProfitTables();
    clearPhoneInputs();
}

function clearPhoneInputs() {
    document.getElementById('phoneModel').value = '';
    document.getElementById('phoneImei').value = '';
    document.getElementById('phoneColour').value = '';
    document.getElementById('phoneOwner').value = '';
    document.getElementById('phoneRevenue').value = '';
    document.getElementById('phoneCost').value = '';
}

function editPhoneEntry(index) {
    const entry = phoneData[index];
    document.getElementById('phoneModel').value = entry.model;
    document.getElementById('phoneImei').value = entry.imei;
    document.getElementById('phoneColour').value = entry.colour;
    document.getElementById('phoneOwner').value = entry.owner;
    document.getElementById('phoneRevenue').value = entry.revenue;
    document.getElementById('phoneCost').value = entry.cost;
    deletePhoneEntry(index);
}

function deletePhoneEntry(index) {
    phoneData.splice(index, 1);
    renderPhoneTable();
    updateOwnerProfitTables();
}

function renderPhoneTable() {
    const tbody = document.getElementById('phoneTableBody');
    tbody.innerHTML = '';

    let totalRevenue = 0, totalCost = 0, totalProfit = 0, totalThabrew = 0, totalKelan = 0;

    phoneData.forEach((entry, index) => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td class="border border-gray-300 px-4 py-2">${entry.model}</td>
            <td class="border border-gray-300 px-4 py-2">${entry.imei}</td>
            <td class="border border-gray-300 px-4 py-2">${entry.colour}</td>
            <td class="border border-gray-300 px-4 py-2">${entry.owner}</td>
            <td class="border border-gray-300 px-4 py-2">${entry.revenue.toFixed(2)}</td>
            <td class="border border-gray-300 px-4 py-2">${entry.cost.toFixed(2)}</td>
            <td class="border border-gray-300 px-4 py-2">${entry.profit.toFixed(2)}</td>
            <td class="border border-gray-300 px-4 py-2">${entry.thabrew.toFixed(2)}</td>
            <td class="border border-gray-300 px-4 py-2">${entry.kelan.toFixed(2)}</td>
            <td class="border border-gray-300 px-4 py-2 text-center">
                <button onclick="editPhoneEntry(${index})" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2">Edit</button>
                <button onclick="deletePhoneEntry(${index})" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
            </td>
        `;

        totalRevenue += entry.revenue;
        totalCost += entry.cost;
        totalProfit += entry.profit;
        totalThabrew += entry.thabrew;
        totalKelan += entry.kelan;
    });

    document.getElementById('phoneTotalRevenue').textContent = totalRevenue.toFixed(2);
    document.getElementById('phoneTotalCost').textContent = totalCost.toFixed(2);
    document.getElementById('phoneTotalProfit').textContent = totalProfit.toFixed(2);
    document.getElementById('phoneTotalThabrew').textContent = totalThabrew.toFixed(2);
    document.getElementById('phoneTotalKelan').textContent = totalKelan.toFixed(2);
}

// Accessory Chart Functions
function addAccessoryEntry() {
    const model = document.getElementById('accessoryModel').value;
    const revenue = parseFloat(document.getElementById('accessoryRevenue').value) || 0;
    const cost = parseFloat(document.getElementById('accessoryCost').value) || 0;

    if (!model) {
        alert('Please enter accessory model');
        return;
    }

    const profit = revenue === 0 ? 0 : revenue - cost;
    const thabrew = profit * 0.8;
    const kelan = profit * 0.2;

    accessoryData.push({ model, revenue, cost, profit, thabrew, kelan });
    
    renderAccessoryTable();
    updateOwnerProfitTables();
    clearAccessoryInputs();
}

function clearAccessoryInputs() {
    document.getElementById('accessoryModel').value = '';
    document.getElementById('accessoryRevenue').value = '';
    document.getElementById('accessoryCost').value = '';
}

function editAccessoryEntry(index) {
    const entry = accessoryData[index];
    document.getElementById('accessoryModel').value = entry.model;
    document.getElementById('accessoryRevenue').value = entry.revenue;
    document.getElementById('accessoryCost').value = entry.cost;
    deleteAccessoryEntry(index);
}

function deleteAccessoryEntry(index) {
    accessoryData.splice(index, 1);
    renderAccessoryTable();
    updateOwnerProfitTables();
}

function renderAccessoryTable() {
    const tbody = document.getElementById('accessoryTableBody');
    tbody.innerHTML = '';

    let totalRevenue = 0, totalCost = 0, totalProfit = 0, totalThabrew = 0, totalKelan = 0;

    accessoryData.forEach((entry, index) => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td class="border border-gray-300 px-4 py-2">${entry.model}</td>
            <td class="border border-gray-300 px-4 py-2">${entry.revenue.toFixed(2)}</td>
            <td class="border border-gray-300 px-4 py-2">${entry.cost.toFixed(2)}</td>
            <td class="border border-gray-300 px-4 py-2">${entry.profit.toFixed(2)}</td>
            <td class="border border-gray-300 px-4 py-2">${entry.thabrew.toFixed(2)}</td>
            <td class="border border-gray-300 px-4 py-2">${entry.kelan.toFixed(2)}</td>
            <td class="border border-gray-300 px-4 py-2 text-center">
                <button onclick="editAccessoryEntry(${index})" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2">Edit</button>
                <button onclick="deleteAccessoryEntry(${index})" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
            </td>
        `;

        totalRevenue += entry.revenue;
        totalCost += entry.cost;
        totalProfit += entry.profit;
        totalThabrew += entry.thabrew;
        totalKelan += entry.kelan;
    });

    document.getElementById('accessoryTotalRevenue').textContent = totalRevenue.toFixed(2);
    document.getElementById('accessoryTotalCost').textContent = totalCost.toFixed(2);
    document.getElementById('accessoryTotalProfit').textContent = totalProfit.toFixed(2);
    document.getElementById('accessoryTotalThabrew').textContent = totalThabrew.toFixed(2);
    document.getElementById('accessoryTotalKelan').textContent = totalKelan.toFixed(2);
}

// Thabrew Profit Functions
function addThabrewEntry() {
    const description = document.getElementById('thabrewDescription').value;
    const amount = parseFloat(document.getElementById('thabrewAmount').value) || 0;

    if (!description) {
        alert('Please enter description');
        return;
    }

    thabrewData.push({ description, amount, isManual: true });
    renderThabrewTable();
    clearThabrewInputs();
}

function clearThabrewInputs() {
    document.getElementById('thabrewDescription').value = '';
    document.getElementById('thabrewAmount').value = '';
}

function editThabrewEntry(index) {
    if (thabrewData[index].isManual) {
        const entry = thabrewData[index];
        document.getElementById('thabrewDescription').value = entry.description;
        document.getElementById('thabrewAmount').value = entry.amount;
        deleteThabrewEntry(index);
    }
}

function deleteThabrewEntry(index) {
    if (thabrewData[index].isManual) {
        thabrewData.splice(index, 1);
        renderThabrewTable();
    }
}

function renderThabrewTable() {
    const tbody = document.getElementById('thabrewTableBody');
    tbody.innerHTML = '';

    let total = 0;

    thabrewData.forEach((entry, index) => {
        const row = tbody.insertRow();
        const actionButtons = entry.isManual ? 
            `<button onclick="editThabrewEntry(${index})" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2">Edit</button>
             <button onclick="deleteThabrewEntry(${index})" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>` : 
            '<span class="text-gray-400 text-sm">Auto</span>';
        
        row.innerHTML = `
            <td class="border border-gray-300 px-4 py-2">${entry.description}</td>
            <td class="border border-gray-300 px-4 py-2">${entry.amount.toFixed(2)}</td>
            <td class="border border-gray-300 px-4 py-2 text-center">${actionButtons}</td>
        `;

        total += entry.amount;
    });

    document.getElementById('thabrewTotal').textContent = total.toFixed(2);
}

// Kelan Profit Functions
function addKelanEntry() {
    const description = document.getElementById('kelanDescription').value;
    const amount = parseFloat(document.getElementById('kelanAmount').value) || 0;

    if (!description) {
        alert('Please enter description');
        return;
    }

    kelanData.push({ description, amount, isManual: true });
    renderKelanTable();
    clearKelanInputs();
}

function clearKelanInputs() {
    document.getElementById('kelanDescription').value = '';
    document.getElementById('kelanAmount').value = '';
}

function editKelanEntry(index) {
    if (kelanData[index].isManual) {
        const entry = kelanData[index];
        document.getElementById('kelanDescription').value = entry.description;
        document.getElementById('kelanAmount').value = entry.amount;
        deleteKelanEntry(index);
    }
}

function deleteKelanEntry(index) {
    if (kelanData[index].isManual) {
        kelanData.splice(index, 1);
        renderKelanTable();
    }
}

function renderKelanTable() {
    const tbody = document.getElementById('kelanTableBody');
    tbody.innerHTML = '';

    let total = 0;

    kelanData.forEach((entry, index) => {
        const row = tbody.insertRow();
        const actionButtons = entry.isManual ? 
            `<button onclick="editKelanEntry(${index})" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2">Edit</button>
             <button onclick="deleteKelanEntry(${index})" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>` : 
            '<span class="text-gray-400 text-sm">Auto</span>';
        
        row.innerHTML = `
            <td class="border border-gray-300 px-4 py-2">${entry.description}</td>
            <td class="border border-gray-300 px-4 py-2">${entry.amount.toFixed(2)}</td>
            <td class="border border-gray-300 px-4 py-2 text-center">${actionButtons}</td>
        `;

        total += entry.amount;
    });

    document.getElementById('kelanTotal').textContent = total.toFixed(2);
}

// Update Owner Profit Tables
function updateOwnerProfitTables() {
    // Clear auto-generated entries
    thabrewData = thabrewData.filter(entry => entry.isManual);
    kelanData = kelanData.filter(entry => entry.isManual);

    // Calculate totals
    let phoneThabrewTotal = 0;
    let phoneKelanTotal = 0;
    let accessoryThabrewTotal = 0;
    let accessoryKelanTotal = 0;
    let accessoryCostTotal = 0;

    phoneData.forEach(entry => {
        phoneThabrewTotal += entry.thabrew;
        phoneKelanTotal += entry.kelan;
    });

    accessoryData.forEach(entry => {
        accessoryThabrewTotal += entry.thabrew;
        accessoryKelanTotal += entry.kelan;
        accessoryCostTotal += entry.cost;
    });

    // Add auto entries for Thabrew
    thabrewData.unshift(
        { description: 'Phone Profit', amount: phoneThabrewTotal, isManual: false },
        { description: 'Accessories Profit', amount: accessoryThabrewTotal, isManual: false },
        { description: 'Accessories Cost', amount: accessoryCostTotal, isManual: false }
    );

    // Add TB owner phone entries to Thabrew
    phoneData.forEach(entry => {
        if (entry.owner.toUpperCase() === 'TB') {
            thabrewData.push({ 
                description: `${entry.model}, ${entry.imei}`, 
                amount: entry.cost, 
                isManual: false 
            });
        }
    });

    // Add auto entries for Kelan
    kelanData.unshift(
        { description: 'Phone Profit', amount: phoneKelanTotal, isManual: false },
        { description: 'Accessories Profit', amount: accessoryKelanTotal, isManual: false }
    );

    renderThabrewTable();
    renderKelanTable();
}

// Initialize
updateOwnerProfitTables();
