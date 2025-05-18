// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-FB-001 - Feedback', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')
    const feedback = 'this apps is lit!'
    const rate = 3 // 4 star

    it('User Can Post A Feedback With Valid Input', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu "Feedback"
            cy.get('.navbar').contains('a', 'Feedback').click()
            cy.url().should('include', '/feedback')

            // Step 2: In the "Give Us Feedback" section, user can see form of add feedback. Fill the form
            cy.get(`#send_feedback-section`).contains('Give Us Feedback')
            cy.get('#send_feedback-section #feedback_body-input').type(feedback)
            cy.get('#send_feedback-section #feedback_rate-input').within(() => {
                cy.get('span').eq(rate).click()
            })
            cy.screenshot(`TC-FB-001_Step-2-${date}`)

            // Step 3: Click the "Send Feedback" button
            cy.get('#send_feedback-section').contains('button','Send Feedback').click()

            // Step 4: Success pop up with text "feedback created" will appear
            cy.get('.swal2-popup:not(.swal2-loading)', { timeout: 5000 }).should('exist').then(() => {
                cy.get('.swal2-html-container').invoke('text').then((text)=>{
                    expect(text).to.equal('feedback created')
                })
                cy.get('.swal2-popup').contains('button', 'Okay!').click()
            })
            // Evidence - Step 4
            cy.screenshot(`TC-FB-001_Step-4-${date}`)
        })
    })
})
