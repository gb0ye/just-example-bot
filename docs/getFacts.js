//the api api we use for the qoute and facts are the same, tho they have different urls
//in this function i used the fetch method to request from the api. there are plenty methods, u can tell chat gpt to tell u more
const getFacts = (ctx) => {
   //used a anonymous function to get u to understand what i was trying to say
   
   const factUrl = "https://api.api-ninjas.com/v1/facts?limit=1"
   const apiKey = process.env.API_KEY;

   // u should try and understand how the fetch works, when we start dealing with more apis you'll need to use it oftern
   fetch(factUrl, {
    //headers is usually not used tho, this is just a special case, you'll also see it in facts since they are the same api
      headers: {
         "X-Api-key": apiKey,
      },
   })
      .then((response) => {
         return response.json()
      })
      .then((data) => {//actual data
         console.log(data); //logs to terminal
         const factMessage = `Fact: ${data[0].fact}`//forming the message
         ctx.reply(factMessage)
      })
      .catch((error) => {//catches error that occurs in any of the .thens
         console.error("Error fecthing facts:", error);
      });
};

module.exports = { getFacts }; //files u plan to be imported from somewhere should be exported like this
