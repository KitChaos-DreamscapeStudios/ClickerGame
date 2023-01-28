class Modifier{
    constructor(ProductionMod, HungerMod, TimeLeft, FoodPerClick, Name, Desc, img){
            this.ProductionMod = ProductionMod;
            this.HungerMod = HungerMod;
            this.TimeLeft = TimeLeft;
            this.FoodPerClick = FoodPerClick;
            this.Name = Name;
            this.Desc = Desc
            this.img = img;
    }

}
class PlayerData{
   
    constructor(){
        this.Buildings = [];
        this.Modifers = [];
        this.FoodCap = 20000
        this.Food = 0
        this.InflationReduction = 0

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
const KibbleWorm = new Building("Kibble Worm", 0.01, 15)//For Production, take amount per second and divide by 1000

const KibbleChest = new Building("Kibble Crate", 0.05, 100)

//I (Kit) have tested this and found that this works like a prefab, and editing it will edit the stats everywhere for it.
const MainPlayer = new PlayerData();
const SmallProductionBoost = new Modifier(1.5, 1,-100,0, "Small Production Bonus", "A Small 5% Food Production Bonus", "Media/PlaceholderFactory.jpg");//This is just a test Modifer

//MainPlayer.Modifers.push(SmallProductionBoost);
function Tick(){
    for(let i = 0; i < MainPlayer.Modifers.length; i++){
        if(MainPlayer.Modifers[i].TimeLeft != -100){
            MainPlayer.Modifers[i].TimeLeft -= 1;
            if(MainPlayer.Modifers[i].TimeLeft <=0){

                
                MainPlayer.Modifers = MainPlayer.Modifers.splice(i,1)
                
            }
        }
       
        
    }
    //This is horrendous and will be optimized
    var KibbleWormAmount = 0
    var KibbleChestAmount = 0
    for(let i = 0; i<MainPlayer.Buildings.length; i++){
       if(MainPlayer.Buildings[i].Type == "Kibble Worm"){
            KibbleWormAmount += 1

       }
       if(MainPlayer.Buildings[i].Type == "Kibble Crate"){
            KibbleChestAmount += 1
       }
    }
    document.getElementById("KibbleWormBuyer").innerHTML = `Purchase Kibble Worm: ${Math.round(KibbleWorm.Cost)}<br>You have ${KibbleWormAmount} Kibble Worms`
    document.getElementById("KibbleChestBuyer").innerHTML = `Purchase Kibble Crate: ${Math.round(KibbleChest.Cost)}<br>You have ${KibbleChestAmount} Kibble Crates`
    
    //End of spaghetti
    var CPS = 0
    for(let i = 0; i<MainPlayer.Buildings.length; i++){
        
        MainPlayer.Food += MainPlayer.Buildings[i].Production * GetBaseProductionModifier();
        CPS += MainPlayer.Buildings[i].Production * GetBaseProductionModifier()
    }
    document.getElementById("FoodCounter").innerHTML = `Food: ${Math.round(MainPlayer.Food)}`
    document.getElementById("CPSCounter").innerHTML = `Food Gained per second: ${(CPS*100).toPrecision(2)}`
    window.setTimeout(Tick, 1)
}

function GetBaseProductionModifier(){
    var Modifer = 0;
    for(let i =0;i<MainPlayer.Modifers.length; i++){
        Modifer += MainPlayer.Modifers[i].ProductionMod
    }
    if(Modifer == 0){
        Modifer = 1
    }
    return Modifer
} 




function BuyBuilding(Building){
    if(MainPlayer.Food >= Building.Cost){
        MainPlayer.Buildings.push(Building)
        MainPlayer.Food -= Building.Cost
        Building.Cost += ((Building.Cost/100)*(22*(MainPlayer.InflationReduction + 1)))
        
        
    }
    else{
        alert(`Not Enough Food to purchase ${Building.Type}`)
    }
   
}
function Click(){
    MainPlayer.Food += 1
    //Lets introduce more complex clicking logic later.
}