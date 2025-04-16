// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-OF-006 - Outfit', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')

    it('User Can Delete Used History For Specific Outfit', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu "Clothes"
            cy.get('.navbar').contains('a', 'Clothes').click()
            cy.url().should('include', '/clothes')

            // Step 2: In the Clothes Page, Click button "Generated Outfit"
            cy.contains('a','Generated Outfit').click()
            cy.url().should('include', '/clothes/generated')
            // Evidence - Step 2
            cy.screenshot(`TC-OF-006_Step-2-${date}`)

            // Step 3: Find section "My Outfit", choose and click the first item
            cy.get('h1').contains('My Outfit')
            cy.get('#outfit-holder .box-clothes').first().click()

            // Step 4: In the specific Outfit Detail Page, Find section "Used History", and there will be a table of list used history. Select first item and click delete button at last column
            cy.url().should('include','clothes/outfit')
            cy.get(`#used_history-section`).contains('Used History')
            cy.get('#used_history-table tbody tr').first().find('td').last().find('button').click()  
            // Evidence - Step 4
            cy.screenshot(`TC-OF-006_Step-4-${date}`)

            // Step 5 : In the pop up validation with description "Want to permanentally delete this outfit history?", press button "Yes, Delete It!"
            cy.get('.swal2-popup', { timeout: 5000 }).should('exist').then(() => {
                cy.get('.swal2-html-container').invoke('text').then((text)=>{
                    expect(text).to.equal('Want to permanentally delete this outfit history?')
                })
                cy.get('.swal2-popup').contains('button', 'Yes, Delete it!').click()
            })
            // Evidence - Step 5
            cy.screenshot(`TC-OF-006_Step-5-${date}`)

            // Step 6 : Success pop up with text "outfit history permentally deleted" will appear
            cy.get('.swal2-popup', { timeout: 5000 }).should('exist').then(() => {
                cy.get('.swal2-html-container').invoke('text').then((text)=>{
                    expect(text).to.equal('outfit history permentally deleted')
                })
                cy.get('.swal2-popup').contains('button', 'Okay!').click()
            })
            // Evidence - Step 6
            cy.screenshot(`TC-OF-006_Step-6-${date}`)
        })
    })
})
