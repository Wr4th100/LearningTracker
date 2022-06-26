const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const inputEl = document.getElementById("input-el")
const tabBtn = document.getElementById("tab-btn")

let myLeads = []
let myLeadTitles = []

const ulEl = document.getElementById("ul-el")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const leadTitlesFromLocalStorage = JSON.parse(localStorage.getItem("myLeadTitles"))

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    myLeadTitles = leadTitlesFromLocalStorage
    render(myLeads, myLeadTitles)
}

function render(leads, leadTitles) {
    listItems = ""

    for (let i=0; i<leads.length; i++) {
        try {      
            listItems += `
                <li>
                    <a target='_blank' href='${leads[i]}'>
                        ${leadTitles[i]}
                    </a>
                </li>
            `
            ulEl.innerHTML = listItems
            console.log(listItems)
        } catch (TypeError){
            listItems += `
                <li>
                    <a target='_blank' href='${leads[i]}'>
                        ${leads[i]}
                    </a>
                </li>
            `
            ulEl.innerHTML = listItems
            
        } 
    }
    
}



tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        myLeadTitles.push(tabs[0].title)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        localStorage.setItem("myLeadTitles", JSON.stringify(myLeadTitles))
        render(myLeads, myLeadTitles)
    })
    
})

deleteBtn.addEventListener("dblclick", function() {
    myLeads = []
    myLeadTitles = []
    localStorage.clear()
    
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    localStorage.setItem("myLeadTitles", JSON.stringify(myLeadTitles))
    render(myLeads, myLeadTitles)     
})


