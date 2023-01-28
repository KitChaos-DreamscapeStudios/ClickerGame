
//#region ModiferDeclarations;
class Modifier{
    constructor(Modifer, Name, Desc, Type){
            this.Modifer = Modifer
            this.Name = Name;
            this.Desc = Desc
            this.Type = Type
           
    }

}
const SmallClickPowerBoost = new Modifier(0.25, "Small Click Power Bonus", "A Small 25% Clicking Power Bonus", "Click Power")
const LargeProductionBoost = new Modifier(0.1, "Large Production Bonus", "A Large 10% Food Production Bonus", "Production");
const SmallProductionBoost = new Modifier(0.05, "Small Production Bonus", "A Small 5% Food Production Bonus", "Production");//This is just a test Modifer
const SmallProductionLoss = new Modifier(-0.05, "Small Production Loss", "A Small 5% Food Production Loss", "Production");//This is just a test Modifer
//#endregion
class PlayerData{
   
    constructor(){
        this.Buildings = [];
        this.Modifers = [];
        this.FoodCap = 20000
        this.Food = 0
        this.Inflation = 22

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
    return t/1000
}

const KibbleWorm = new Building("Kibble Worm", 0.01, 15)//For Production, take amount per second and divide by 1000

const KibbleChest = new Building("Kibble Crate", 0.05, 100)

//I (Kit) have tested this and found that this works like a prefab, and editing it will edit the stats everywhere for it.
const MainPlayer = new PlayerData();

//MainPlayer.Modifers.push(AllModifiers.SmallProductionBoost);
//MainPlayer.Modifers.push(LargeProductionBoost);
//MainPlayer.Modifers.push(SmallProductionLoss)
MainPlayer.Modifers.push(SmallClickPowerBoost);
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
        
        MainPlayer.Food += MainPlayer.Buildings[i].Production + (MainPlayer.Buildings[i].Production *GetModifier("Production"))
        CPS += MainPlayer.Buildings[i].Production + (MainPlayer.Buildings[i].Production *GetModifier("Production"))
    }
    GetModifier("Production")
    GetModifier("Click Power")
    document.getElementById("FoodCounter").innerHTML = `Food: ${Math.round(MainPlayer.Food)}`
    document.getElementById("CPSCounter").innerHTML = `Food Gained per second: ${(CPS*100).toPrecision(2)}`
    window.setTimeout(Tick, 1)
}

function GetModifier(Type){
    var Modifer= 0;
    for(let i =0;i<MainPlayer.Modifers.length; i++){
        if(MainPlayer.Modifers[i].Type == Type){
            Modifer += MainPlayer.Modifers[i].Modifer
        }
       
    }
    document.getElementById(`${Type}Bonus`).innerHTML = `${(Modifer*100).toPrecision(2)}%`
    if(Modifer >0){
        document.getElementById(`${Type}Bonus`).style.color = "Green"
    }
    else{
        document.getElementById(`${Type}Bonus`).style.color = "Red"
    }
    SetModifiersText(Type)
    return Modifer
} 

function SetActive(div){
    div.style.display = "block";
}
function Disable(div){
    div.style.display = "none";
}
function SetModifiersText(Type){
    var ModText ="";
    for(let i =0;i<MainPlayer.Modifers.length; i++){
        if(MainPlayer.Modifers[i].Type == Type){
            var Mod = ""
            if(MainPlayer.Modifers[i].Modifer >0){
                Mod = "+"
            }
            
            ModText += `<b>${MainPlayer.Modifers[i].Name}</b><br>${Mod}${MainPlayer.Modifers[i].Modifer*100}% ${Type}<br>`
        }
       
    }
    document.getElementById(`${Type}Desc`).innerHTML = `You have the following ${Type} modifiers <br> ${ModText}`
}
function BuyBuilding(Building){
    if(MainPlayer.Food >= Building.Cost){
        MainPlayer.Buildings.push(Building)
        MainPlayer.Food -= Building.Cost
        Building.Cost += ((Building.Cost/100)*(MainPlayer.Inflation))
        
        
    }
    else{
        alert(`Not Enough Food to purchase ${Building.Type}`)
    }
   
}
function Click(){
    MainPlayer.Food += 1 + (1 * GetModifier("Click Power"))
    //Lets introduce more complex clicking logic later.
}