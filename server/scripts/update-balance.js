const PouchDB = require('pouchdb');
const userDb = new PouchDB('users');

async function updateBalance() {
  try {
    // Get the user document
    const user = await userDb.get('user_smokee');
    console.log('Current user:', user);
    
    // Update balance
    user.balance = 1000;
    
    // Save back to DB
    const result = await userDb.put(user);
    console.log('Updated successfully:', result);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit(0);
  }
}

updateBalance();
