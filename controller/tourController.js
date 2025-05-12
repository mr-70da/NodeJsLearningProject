const fs = require('fs');
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.patchTour = (req,res)=>{
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

exports.getAllTours = (req,res)=>{
    res.status(200).json({
        status:'success',
        data:{
            tours
        }
    })
}
exports.getTour = (req,res)=>{
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
exports.addTour = (req,res)=>{
    // console.log(req.body);
    const newId = tours[tours.length-1].id +1;
    const newTour = Object.assign({id : newId},req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
        res.status(201).json({
        status:"success",
        data : {
            tours : newTour
        }
    })

});

}   
exports.deleteTour = (req,res)=>{
    const tourId = ( req.params.id*1);
    const tour = tours.find(el => el.id === tourId);
    if(tour!== undefined){
        tours[tourId] = {};
        fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
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