// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-FB-003 - Feedback', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')
    const feedback = 'this apps is lit!'

    it('User Cant Post A Feedback With Empty Feedback Rate', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu "Feedback"
            cy.get('.navbar').contains('a', 'Feedback').click()
            cy.url().should('include', '/feedback')

            // Step 2: In the "Give Us Feedback" section, user can see form of add feedback. Fill the form
            cy.get(`#send_feedback-section`).contains('Give Us Feedback')
            cy.get('#send_feedback-section #feedback_body-input').type(feedback)
            cy.screenshot(`TC-FB-003_Step-2-${date}`)

            // Step 3: Click the "Send Feedback" button
            cy.get('#send_feedback-section').contains('button','Send Feedback').click()

            // Step 4: Failed pop up with text "The feedback rate field is required" will appear
            cy.get('.swal2-popup:not(.swal2-loading)', { timeout: 5000 }).should('exist').then(() => {
                cy.get('.swal2-html-container').invoke('text').then((text)=>{
                    expect(text).to.equal('The feedback rate field is required')
                })
                cy.get('.swal2-popup').contains('button', 'Okay!').click()
            })
            // Evidence - Step 4
            cy.screenshot(`TC-FB-002_Step-4-${date}`)
        })
    })
})
