import axios from 'axios'
import formatPhoneNumber from '../utilities/formatPhoneNumber'

const checkValidation = async (user) => {

    
        // check for non letters in firstname and last name

        console.log(!user.firstname.match(/^[0-9a-zA-Z]+$/));
        if(!user.firstname.match(/^[0-9a-zA-Z]+$/)){
            alert('First Name must only have alphanumeric characters');
            return false;
        }
        console.log(!user.lastname.match(/^[0-9a-zA-Z]+$/));
        if(!user.lastname.match(/^[0-9a-zA-Z]+$/)){
            alert('Last Name must only have alphanumeric characters');
            return false;
        }
        console.log(!user.username.match(/^[0-9a-zA-Z]+$/));
        if(!user.username.match(/^[0-9a-zA-Z]+$/)){
            alert('Username must only have alphanumeric characters');
            return false;
        }
        
        //check if username or email exists
        try{
            let response = await axios.get(`/api/get/username/${user.username}`);
            console.log(response.data !== null);
            if(response.data !== null){
                alert('Username already exists in the system. Please choose another username');
                return false;
            }

            
            response = await axios.get(`/api/get/email/${user.email}`);
            console.log(response.data !== null);
            if(response.data !== null){
                alert('Email already exists in the system. Please choose another email');
                return false;
            }
        }catch(error) {console.log(error)}

        if(user.password.length < 8){
            alert('Password must be atleast 8 characters');
            return false;
        }

        let checks = formatPhoneNumber(user.number)
        if(checks !== true){
            return false;
        }

        return true;
}

export default checkValidation
