require("dotenv").config()
const e = require("express")
const express= require("express")
const app= express()

app.use(express.json())

const rooms=[
    {
        name:"Elite",
        seats:100,
        amenities:"wifi,projection screen,AC",
        price:"1500/hr",
        roomId:"abc",
        bookingDetails:[{
            customerName:"Sujal Singh",
            date:new Date("2021-10-10"),
            start:"07:00",
            end:"10:00",
            status:"confirmed"
        }]
    },
    {
        name:"Premium",
        seats:150,
        amenities:"wifi,projection screen,AC",
        price:2500,
        roomId:"def",
        bookingDetails:[{
            customerName:"Niharika P",
            date:new Date("2021-10-11"),
            start:"15:00",
            end:"17:00",
            status:"Payment Pending"
        }]
    }
]
//create room
app.post("/createRoom",(req,res)=>{

    try {rooms.push({
        name:req.body.name,
        seats:req.body.seats,
        amenities:req.body.amenities,
        price:req.body.price,
        roomId:req.body.roomId,
        bookingDetails:[{}]
    })} catch(err){
        console.log(err);
    }
res.send("Room Created")
})



//Book rooms
app.post("/bookRoom",(req,res,next)=>{
for(let i=0;i<rooms.length;i++)
{
    if(! (rooms[i].roomId === req.body.roomId)){
         return res.status(400).send({error:"Room does not exist"})         
    }
    else
    {
        let booking={
            customerName:req.body.name,
            date:new Date(req.body.date),
            start:req.body.start,
            end:req.body.end,
            status:"confirmed"
        }
        let result=undefined;
        rooms[i].bookingDetails.forEach((book)=>{
            if(book.date.getTime() == booking.date.getTime()  && book.start === booking.start )
            {
                result=0
                console.log("in booking")                 
            }
            else{
                result=1
                rooms[i].bookingDetails.push(booking)
            }
        })
        if(result)
        return res.status(200).send("Booking confirmed")
        else
        return res.status(400).send({error:"Please select different time slot"})

    }
    
}
})

//List the customers

app.get("/listCustomer",(req,res)=>{

    let customerArray=[]
    
    rooms.forEach((room)=>{
        let customerObj={roomName:room.name}
    
        room.bookingDetails.forEach((customer)=>{
            customerObj.customerName=customer.customerName
             customerObj.date=customer.date
            customerObj.start=customer.start
            customerObj.end=customer.end
    
            customerArray.push(customerObj)
        })
    })
    
    res.send(customerArray)
    
    })

//List room along with booking details

app.get("/listRooms",(req,res)=>{
    res.send(rooms)
})



const port =process.env.PORT || 3001
app.listen(port,()=>{
    console.log("server running in port",port)
})