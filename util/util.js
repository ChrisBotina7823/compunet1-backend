import bcrypt from 'bcrypt';
import fs from 'fs';

const generateId = () => {
    return Math.floor(Math.random() * 1000000000).toString();
}

const encryptPassword = (password) => {
    return bcrypt.hashSync(password, 10);
}

const checkDataFolder = () => {
    if (!fs.existsSync('./data')){
        fs.mkdirSync('./data');
    }

}

const loadData = (modelName, buildModel) => {
    try{
        checkDataFolder();
        const data = fs.readFileSync(`./data/${modelName}.json`, 'utf8');
        const jsonData = JSON.parse(data);
        const modelData = jsonData.map(data => new buildModel(data));
        return modelData;
    } catch (err){
        console.error(`${modelName} file not found, created empty array`)
        return [];
    }
}

const saveData = (modelName, data) => {
    try{
        checkDataFolder();
        fs.writeFileSync(`./data/${modelName}.json`, JSON.stringify(data), 'utf8');
    } catch (err){
        console.error("Error saving users: ",err)
    }
}

export {
    generateId,
    encryptPassword,
    loadData,
    saveData,
}