const bcrypt = require('bcrypt');

class Utils {

    generateId = (length) =>{
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };

    generateHash = (text, saltRounds=10) => {
        return bcrypt.hashSync(text, saltRounds);
    };

    matchHash = (text, hash) => {
        return bcrypt.compareSync(text, hash)
    };

    checkParamValidation = (validate_param, data) => {

        for (let i=0; i<validate_param.length; i++ ){

            if (!data[validate_param[i]]) {
                return `${validate_param[i]} is required!`;
            }
        }

        return null;
    };
}

module.exports = Utils;
