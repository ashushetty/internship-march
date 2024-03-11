const RESPONSE  ={
    SUCCESS: {
        code:200,
        message: "Everything worked as expected",
    },

    UNKNOWN_ERROR:{
        code:500,
        message:"An error occurred that was not anticpated ",
       },
    REQUIRED_PARAMS:{
        code:201,
        message:"is a required param ",
     },
    
     NO_DATA:{
        code: 202,
        message:"no data found",
     },
     INVALID_ID:{
        code: 203,
        message:"ID is invalid",
     },
     EXISTING_DATA:{
        code: 204,
        message:"Already exists",
     },

};

export  default RESPONSE;