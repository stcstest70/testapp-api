import fs from 'fs';

const userDataFilePath = './database/Admin.json';

function readAdminData() {
  try {
    const data = fs.readFileSync(userDataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function writeAdminData(data) {
  fs.writeFileSync(userDataFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

if (!fs.existsSync(userDataFilePath)) {
    writeAdminData([]);
}

export { readAdminData, writeAdminData };