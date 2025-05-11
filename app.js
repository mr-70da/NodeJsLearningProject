
const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();
//1-Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use((req,res,next)=>{
    console.log('Hello, from middleware');
    next();
});
app.use((req,res,next)=>{
    req.requestTime = new Date().toISOString();
    next();
});
//2-Route Handler
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
const users = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/users.json`));
const patchTour = (req,res)=>{
        const tourId =  req.params.id*1;
        let tour = tours.find(el => el.id === tourId);
        if(tour){
            tour = req.body;
            tours[tourId] = tour;
            
            fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
                res.status(201).json({
                    status:"successfully patched",
                    data : {
                        tour
                    }
                })
                
            });
    }else{
        res.status(404).json({
            status : 'Not found'
        })
    }
}

const getAllTours = (req,res)=>{
    res.status(200).json({
        status:'success',
        data:{
            tours
        }
    })
}
const getTour = (req,res)=>{
    const tourId = ( req.params.id*1);
    const tour = tours.find(el => el.id === tourId);
    if(tour!== undefined){
        res.status(200).json({
            status:'success',
            data:{
                tour
            }
        })
    }else{
        res.status(404).json({
            status: 'Not found',
            data :{
                tour : req.body

            }
        })
    }
    
}
const addTour = (req,res)=>{
    // console.log(req.body);
    const newId = tours[tours.length-1].id +1;
    const newTour = Object.assign({id : newId},req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
        res.status(201).json({
        status:"success",
        data : {
            tours : newTour
        }
    })

});

}   
const deleteTour = (req,res)=>{
    const tourId = ( req.params.id*1);
    const tour = tours.find(el => el.id === tourId);
    if(tour!== undefined){
        tours[tourId] = {};
        fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
           res.status(200).json({
            status:'success',
            }) 
        });
        
    }else{
        res.status(404).json({
            status: 'Not found',
            data :{
                tour : req.body

            }
        })
    }

};
//Users
const getAllUsers = (req,res)=>{


}
const getUser = (req,res)=>{
    
};
const updateUser = (req,res)=>{

}
const deleteUser = (req,res)=>{

}
const createUser = (req,res)=>{}
 //3-Route
app.route('/api/v1/tours/').
    get(getAllTours).
    post(addTour);
app.route('/api/v1/tours/:id').
    get(getTour).
    delete(deleteTour).
    patch(patchTour);

app.route('/api/v1/users')
   .get(getAllUsers)
   .post(createUser);
app.route('/api/v1/users/:id')
   .get(getUser)
   .patch(updateUser)
   .delete(deleteUser);
//4-Start Server
const port = 3000;
app.listen(port,()=>{
    console.log(`App running on port${port}`);
})
