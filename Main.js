class Modifier{
    constructor(ProductionMod, HungerMod, TimeLeft, FoodPerClick){
            this.ProductionMod = ProductionMod;
            this.HungerMod = HungerMod;
            this.TimeLeft = TimeLeft;
            this.FoodPerClick = FoodPerClick;
    }

}
class PlayerData{
   
    constructor(){
        this.Buildings = [];
        this.Modifers = [];
        this.FoodCap = 20000
        this.Food = 0

    }
}
class Building{
    constructor(Type, Production, Cost){
        this.Type = Type
        this.Production = Production
        this.Cost = Cost

    }
}
function Second(t){
    return t*1000
}
const KibbleWorm = new Building("Kibble Worm", 0.01, 10)//For Production, take amount per second and divide by 1000
const MainPlayer = new PlayerData();

function Tick(){
    for(let i = 0; i < MainPlayer.Modifers.length; i++){
        if(MainPlayer.Modifers[i].TimeLeft != -100){
            MainPlayer.Modifers[i].TimeLeft -= 1;
            if(MainPlayer.Modifers[i].TimeLeft <=0){

                
                MainPlayer.Modifers = MainPlayer.Modifers.splice(i,1)
                
            }
        }
       
        
    }
    for(let i = 0; i<MainPlayer.Buildings.length; i++){
        MainPlayer.Food += MainPlayer.Buildings[i].Production;
    }
    document.getElementById("FoodCounter").innerHTML = `Food: ${Math.round(MainPlayer.Food)}`
    window.setTimeout(Tick, 1)
}
function BuyBuilding(Building){
    if(MainPlayer.Food >= Building.Cost){
        MainPlayer.Buildings.push(Building)
        MainPlayer.Food -= Building.Cost
    }
    else{
        alert(`Not Enough Food to purchase ${Building.Type}`)
    }
   
}
function Click(){
    MainPlayer.Food += 1
    //Lets introduce more complex clicking logic later.
}