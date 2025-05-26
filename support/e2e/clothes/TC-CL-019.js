// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-CL-019 - Clothes', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')
    const clothes_name = 'Casual T-Shirt'

    const schedule_data = {
        day: 'Sun',
        schedule_note: 'For work',
    };

    it('User Cant Add Schedule With Duplicated Day In The Same Clothes', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu "Clothes"
            cy.get('.navbar').contains('a', 'Clothes').click()
            cy.url().should('include', '/clothes')

            // Step 2: Find section "All Clothes", choose the clothes with name "Casual T-Shirt"
            cy.get('h2').contains('All Clothes')
            cy.get('#clothes_holder .box-clothes').each($el => {
                const clothes_name_text = Cypress.$($el).find('h4').text().trim()

                if (clothes_name_text == clothes_name) {
                    cy.wrap($el).find('.btn-detail').click()
                    return false 
                }
            })

            // Step 3: In the Clothes Detail page, find "Schedule", use first schedule's day for next new schedule
            cy.url().should('include','/clothes/detail')
            cy.get('#schedule-section').should('exist').contains('Schedule')
            cy.get('#schedule-table tbody tr').first().within(() => {
                cy.get('td').first().then($dayCell => {
                    const dayText = $dayCell.text().trim()
                    schedule_data.day = dayText
                })
            })

            // Step 4: Press button "Schedule"
            cy.get('#schedule-section').should('exist').contains('button','Schedule').click()
            // Evidence - Step 4
            cy.screenshot(`TC-CL-019_Step-4-${date}`)

            // Step 5: A pop up will appear. In the "Add Schedule" form, fill with valid input
            cy.get('.modal.fade.show', { timeout: 5000 }).should('exist').within(() => {
                cy.get('.modal-title').invoke('text').then((text) => {
                    expect(text).to.equal('Add Schedule')
                })
                // Notes & Day
                cy.get('#day').select(schedule_data.day)
                cy.get('#schedule_note').type(schedule_data.schedule_note, { force: true })
                // Evidence - Step 5
                cy.screenshot(`TC-CL-019_Step-5-${date}`)

                // Step 6: Click the "Save" button
                cy.get('.modal-footer').contains('button', 'Save').click()
            })           

            // Step 7: A Failed Pop Up will appear with text "day has been used. try another". Click "Okay!"
            cy.get('.swal2-popup:not(.swal2-loading)', { timeout: 10000 }).should('exist').then(() => {
                cy.get('.swal2-html-container').invoke('text').then((text)=>{
                    expect(text).to.equal("day has been used. try another")
                })
                // Evidence - Step 7
                cy.screenshot(`TC-CL-019_Step-7-${date}`)
                cy.get('.swal2-popup').contains('button', 'Okay!').click()
            })
        })
    })
})
