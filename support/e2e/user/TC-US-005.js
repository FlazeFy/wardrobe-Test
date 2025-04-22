// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-US-005 - User', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')

    it('User Can Delete Their History', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu button that contain username to open the Profile Page
            cy.get('.navbar').contains('a', username).click()
            cy.url().should('include', '/profile')

            // Step 2: In the "My History" section, user can see list of history and delete button
            cy.get(`#history-section`).contains('My History')
            cy.get('#history-section .history-box').first().find('button.btn-delete-history').click()

            // Step 3: In the pop up validation with description "Want to permanentally delete this history?", press button "Yes, Delete it!"
            cy.get('.swal2-popup', { timeout: 5000}).should('exist').then(() => {
                cy.get('.swal2-html-container').invoke('text').then((text)=>{
                    expect(text).to.equal('Want to permanentally delete this history?')
                })
                cy.get('.swal2-popup').contains('button','Yes, Delete it!').click()
            }) 
            // Evidence - Step 3
            cy.screenshot(`TC-US-005_Step-3-${date}`)

            // Step 4: Success pop up with text "history permentally deleted" will appear
            cy.get('.swal2-popup', { timeout: 5000 }).should('exist').then(() => {
                cy.get('.swal2-html-container').invoke('text').then((text)=>{
                    expect(text).to.equal('history permentally deleted')
                })
                cy.get('.swal2-popup').contains('button', 'Okay!').click()
            })
            // Evidence - Step 4
            cy.screenshot(`TC-US-005_Step-4-${date}`)
        })
    })
})
