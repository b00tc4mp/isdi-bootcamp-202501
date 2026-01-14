let months = ['Jan', 'March', 'April', 'June']

// --- MUTES THE ORIGINAL ARRAY!!

//-- 1 arg -> START INDEX
months.splice(2)
console.log(months)
// Expected output: Array ['Jan', 'March']

months = ['Jan', 'March', 'April', 'June']

//-- 2 arg -> START INDEX, DELETECOUNT
months.splice(1, 2)
console.log(months)
// Expected output: Array ['Jan','June']

months = ['Jan', 'March', 'April', 'June']

//-- 3 arg -> START INDEX, DELETECOUNT, ITEM REPLACED BY
months.splice(4, 1, 'May')
console.log(months)
// Expected output: Array ['Jan', 'March', 'April', 'June', 'May']

months = ['Jan', 'March', 'April', 'June']

//-- 3 arg -> START INDEX, DELETECOUNT, ITEMS REPLACED BY
months.splice(1, 2, 'February', 'March')
console.log(months)
// Expected output: Array [ 'Jan', 'February', 'March', 'June' ]