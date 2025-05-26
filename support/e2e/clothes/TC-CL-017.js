// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-CL-017 - Clothes', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')
    const clothes_name = 'Casual T-Shirt'

    const schedule_data = {
        day: 'Thu',
        schedule_note: 'For working',
    };

    it('User Can Add Schedule With Valid Data', () => {
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

            // Step 3: In the Clothes Detail page, find "Schedule", and press button "Schedule"
            cy.url().should('include','/clothes/detail')
            cy.get('#schedule-section').should('exist').contains('Schedule')
            cy.get('#schedule-section').should('exist').contains('button','Schedule').click()
            
            // Evidence - Step 3
            cy.screenshot(`TC-CL-017_Step-3-${date}`)

            // Step 4: A pop up will appear. In the "Add Schedule" form, fill with valid input
            cy.get('.modal.fade.show', { timeout: 5000 }).should('exist').within(() => {
                cy.get('.modal-title').invoke('text').then((text) => {
                    expect(text).to.equal('Add Schedule')
                })
                // Notes & Context
                cy.get('#day').select(schedule_data.day)
                cy.get('#schedule_note').type(schedule_data.schedule_note)
                // Evidence - Step 4
                cy.screenshot(`TC-CL-017_Step-4-${date}`)

                // Step 5: Click the "Save" button
                cy.get('.modal-footer').contains('button', 'Save').click()
            })           

            // Step 6: A Success Pop Up will appear with text "schedule created". Click "Okay!"
            cy.get('.swal2-popup:not(.swal2-loading)', { timeout: 10000 }).should('exist').then(() => {
                cy.get('.swal2-html-container').invoke('text').then((text)=>{
                    expect(text).to.equal("schedule created")
                })
                // Evidence - Step 6
                cy.screenshot(`TC-CL-017_Step-6-${date}`)
                cy.get('.swal2-popup').contains('button', 'Okay!').click()
            })
        })
    })
})
