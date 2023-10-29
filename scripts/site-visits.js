const VISITS_KEY = 'site-visits'

function getSiteVisits() {
    let currentValue= localStorage.getItem(VISITS_KEY)
    let siteVisits= 1

    if (currentValue != null) {
        siteVisits = parseInt(currentValue) + 1
    
    }

    localStorage.setItem(VISITS_KEY, `${siteVisits}`)
    return siteVisits

}
document.getElementById("visitcount").textContent = `${getSiteVisits()}`