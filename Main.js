
//#region ModiferDeclarations;
class Modifier{
    constructor(Modifer, Name, Type, TimeLeft){
            this.Modifer = Modifer
            this.Name = Name;
            
            this.Type = Type
            this.TimeLeft = TimeLeft
           
    }

}
const Investment = new Modifier(0.15, "Investment", "Production", Second(300))
class PlayerData{
   
    constructor(){
        this.Buildings = [];
        this.Modifers = [];
        this.FoodCap = 20000
        this.Food = 0
        this.Inflation = 22

    }
}

const MainPlayer = new PlayerData();


class Building{
    constructor(Type, Production, Cost){
        this.Type = Type
        this.Production = Production
        this.Cost = Cost

    }
}
function Second(t){
    return t*100
}

function AddPlayerEffects( {Inflation=0, Food=0, FoodCap=0, Modifers=[], Buildings=[]} = {}){
    
    MainPlayer.Inflation += Inflation
    MainPlayer.Food += Food
    MainPlayer.FoodCap += FoodCap
    for(let i = 0; i<Modifers.length; i++){
        
    MainPlayer.Modifers.push(Modifers[i])
   }
   for(let i = 0; i<Buildings.length; i++){
    MainPlayer.Buildings.push(Buildings[i])
   }
   
   
   
   
}
function GenerateEffectText(Option, Inflation=0, Food=0, FoodCap=0, Modifers=[], Buildings=[]){
    var retStr = ""
    if(Inflation != 0){
        var InfStr = ""
        if(Inflation > 0){
            InfStr = `\nGain ${Inflation} Inflation`

        }
        else{
            InfStr = `\nLose ${Inflation} Inflation`
        }
        retStr += InfStr
    }

}

const KibbleWorm = new Building("Kibble Worm", 0.01, 15)//For Production, take amount per second and divide by 1000

const KibbleChest = new Building("Kibble Crate", 0.05, 100)

//I (Kit) have tested this and found that this works like a prefab, and editing it will edit the stats everywhere for it.


function Tick(){
    //Spaghetti for Event Checkers
    if(MainPlayer.Buildings.length > 5 && !MainPlayer.Modifers.includes(Investment)){
        var Num = Math.floor(Math.random() * 10000)
        if(Num > 9994){
            SetActive(document.getElementById(`LongTermOrShortTermEvent`))
        }
    }
    //End Spaghetti
    for(let i = 0; i < MainPlayer.Modifers.length; i++){
        if(MainPlayer.Modifers[i].TimeLeft != -100){
            MainPlayer.Modifers[i].TimeLeft -= 1;
            if(MainPlayer.Modifers[i].TimeLeft <=0){

                MainPlayer.Modifers.pop(i);
                
                
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
    document.getElementById("InflationCurrent").innerHTML = `${MainPlayer.Inflation}%`;
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
            var len = ""
            if(MainPlayer.Modifers[i].Modifer >0){
                Mod = "+"
            }
            if(MainPlayer.Modifers[i].TimeLeft != -100){
                len = `Active for ${Math.round(MainPlayer.Modifers[i].TimeLeft/100)} more seconds`
            }
            
            ModText += `<b>${MainPlayer.Modifers[i].Name}</b><br>${Mod}${MainPlayer.Modifers[i].Modifer*100}% ${Type}<br>${len}<br>`
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