// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-UH-007 - Used History', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')
    const clothes_name = 'shirt A'

    const used_history_data = {
        clothes_note: 'today is rainy day. so i wear dark clothes',
        used_context: 'Work',
    };

    it('User Can Add Used History To Specific Clothes Via Clothes Detail', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu "Clothes"
            cy.get('.navbar').contains('a', 'Clothes').click()
            cy.url().should('include', '/clothes')

            // Step 2: Find section "All Clothes", choose the clothes with name "shirt A" and press button "Detail"
            cy.get('h2').contains('All Clothes')
            cy.get('#clothes_holder .box-clothes').each($el => {
                const clothes_name_text = Cypress.$($el).find('h4').text().trim()

                if (clothes_name_text == clothes_name) {
                    cy.wrap($el).find('.btn-detail').click()
                    return false 
                }
            })

            // Step 3: In the section with title "Used History", press button "History"
            cy.get('#used_history-section').within(() => {
                cy.screenshot(`TC-UH-007_Step-3-${date}`)
                cy.get('h2').should('exist').contains('Used History')
                cy.contains('button','History').click()
            })

            // Step 4: A pop up will appear. In the "Add Used History" form, fill with valid input
            cy.get('.modal.fade.show', { timeout: 5000 }).should('exist').within(() => {
                cy.get('.modal-title').invoke('text').then((text) => {
                    expect(text).to.equal('Add Used History')
                })
                // Notes & Context
                cy.get('.clothes_note').type(used_history_data.clothes_note)
                cy.get('.used_context').select(used_history_data.used_context)
                // Evidence - Step 4
                cy.screenshot(`TC-UH-007_Step-4-${date}`)

                // Step 5: Click the "Save" button
                cy.get('.modal-footer').contains('button', 'Save').click()
            })           

            // Step 6: A Success Pop Up will appear with text "clothes history created". Click "Okay!"
            cy.get('.swal2-popup:not(.swal2-loading)', { timeout: 10000 }).should('exist').then(() => {
                cy.get('.swal2-html-container').invoke('text').then((text)=>{
                    expect(text).to.equal("clothes history created")
                })
                // Evidence - Step 6
                cy.screenshot(`TC-UH-007_Step-6-${date}`)
                cy.get('.swal2-popup').contains('button', 'Okay!').click()
            })
        })
    })
})
