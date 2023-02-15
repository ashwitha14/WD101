const entry_histroy = document.getElementById("dat");
const name_entry = document.getElementById("name");
const tac_entry = document.getElementById("acceptTerms");
const pass_entry = document.getElementById("password");
const entry_db = document.getElementById("dob");
const email_entry = document.getElementById("email");
const sub_all = document.getElementById("submit");
const date = new Date();
let list_all = []
const dateValidity = (start_date) => {
    const date_use=start_date.replace("-",".")
    const date_user=date_use.split("-").map((d) => Number(d))
    const year_date = (date_user[0] >= (date.getFullYear() - 55) && date_user[0] <= (date.getFullYear() - 18))
    let month_date;
    let yer;
    let day_date;
    let daya;
    if (date_user[0] === date.getFullYear() - 55) {
        month_date = date_user[1] >= (date.getMonth() + 1)
        day_date = date_user[2] >= (date.getDate())
    } else if (year_date) {
        month_date = true
        day_date = true
    } else if (date_user[0] === date.getFullYear() - 18) {
        month_date = date_user[1] <= (date.getMonth() + 1)
        day_date = date_user[2] <= (date.getDate())
    } else {
        month_date = false
        day_date = false
    }
    qns=year_date && month_date && day_date;
    return qns
}
const valid_it = (element) => {
    return element.validity.valid
}
const digits = (num) => {
    if (num < 10) {
        return "0" + num;
    } else {
        return num;
    }
}
const sendStorage = (name, email, password, dob, terms) => {
    const userData = {
        name,
        email,
        password,
        dob,
        terms
    }
    list_all.push(userData)
    localStorage.setItem('userData', JSON.stringify(list_all))
}
sub_all.addEventListener("click", () => {
    const date_user = entry_db.value
    if (!dateValidity(date_user)) {
        entry_db.setCustomValidity(`Date must be between ${date.getFullYear() - 55}-${digits(date.getMonth() + 1)}-${digits(date.getDate())} and ${date.getFullYear() - 18}-${digits(date.getMonth() + 1)}-${digits(date.getDate())}`)
    } else {
        entry_db.setCustomValidity("")
    }

    const allValid = valid_it(name_entry) && valid_it(email_entry) && valid_it(pass_entry) && valid_it(entry_db)

    if (allValid) {
        sendStorage(name_entry.value, email_entry.value, pass_entry.value, entry_db.value, tac_entry.checked)
    }
})
const srg_loc = () => {
    list_all = JSON.parse(localStorage.getItem("userData"))
    if (list_all === null) {
        list_all = []
    } else {
        const view = list_all.map((entry) => {
            let l_rws = ""
            const allKeys = Object.keys(entry)

            for (let i = 0; i < allKeys.length; i++) {
                l_rws += `<td>${entry[allKeys[i]]}</td>`
            }

            return `<tr>${l_rws}</tr>`
        })
        entry_histroy.innerHTML += view.join("\n")
    }
}
srg_loc()