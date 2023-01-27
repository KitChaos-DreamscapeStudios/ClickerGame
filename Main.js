class Modifier{
    constructor(ProductionMod, HungerMod, TimeLeft, FoodPerClick, Name, Desc){
            this.ProductionMod = ProductionMod;
            this.HungerMod = HungerMod;
            this.TimeLeft = TimeLeft;
            this.FoodPerClick = FoodPerClick;
            this.Name = Name;
            this.Desc = Desc
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
//I (Kit) have tested this and found that this works like a prefab, and editing it will edit the stats everywhere for it.
const MainPlayer = new PlayerData();
const SmallProductionBoost = new Modifier(1.5, 1,-100,0, "Small Production Bonus", "A Small 5% Food Production Bonus");//This is just a test Modifer
MainPlayer.Modifers.push(SmallProductionBoost);
function Tick(){
    for(let i = 0; i < MainPlayer.Modifers.length; i++){
        if(MainPlayer.Modifers[i].TimeLeft != -100){
            MainPlayer.Modifers[i].TimeLeft -= 1;
            if(MainPlayer.Modifers[i].TimeLeft <=0){

                
                MainPlayer.Modifers = MainPlayer.Modifers.splice(i,1)
                
            }
        }
       
        
    }
    //This is horrendus and will be optimized
    var KibbleWormAmount = 0
    for(let i = 0; i<MainPlayer.Buildings.length; i++){
       if(MainPlayer.Buildings[i].Type == "Kibble Worm"){
            KibbleWormAmount += 1

       }
    }
    document.getElementById("KibbleWormBuyer").innerHTML = `Purchase Kibble Worm: ${Math.round(KibbleWorm.Cost)}<br>You have ${KibbleWormAmount} Kibble Worms`
    
    //End of spaghetti
    for(let i = 0; i<MainPlayer.Buildings.length; i++){
        
        MainPlayer.Food += MainPlayer.Buildings[i].Production * GetBaseProductionModifier();
    }
    document.getElementById("FoodCounter").innerHTML = `Food: ${Math.round(MainPlayer.Food)}`
    window.setTimeout(Tick, 1)
}
function GetBaseProductionModifier(){
    var Modifer = 0;
    for(let i =0;i<MainPlayer.Modifers.length; i++){
        Modifer += MainPlayer.Modifers[i].ProductionMod
    }
    return Modifer
}


function BuyBuilding(Building){
    if(MainPlayer.Food >= Building.Cost){
        MainPlayer.Buildings.push(Building)
        MainPlayer.Food -= Building.Cost
        Building.Cost += ((Building.Cost/100)*5)
        
    }
    else{
        alert(`Not Enough Food to purchase ${Building.Type}`)
    }
   
}
function Click(){
    MainPlayer.Food += 1
    //Lets introduce more complex clicking logic later.
}