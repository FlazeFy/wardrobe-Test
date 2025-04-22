// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-US-006 - User', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')
    const question = 'how i use this apps?'

    it('User Can Post A Question With Valid Input', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu button that contain username to open the Profile Page
            cy.get('.navbar').contains('a', username).click()
            cy.url().should('include', '/profile')

            // Step 2: In the "Ask A Question" section, user can see form of add question. Fill the form
            cy.get(`#send_question-section`).contains('Ask A Question')
            cy.get('#send_question-section #question-input').type(question)
            cy.screenshot(`TC-US-006_Step-2-${date}`)

            // Step 3: Click the "Send Question" button
            cy.get('#send_question-section').contains('button','Send Question').click()

            // Step 4: Success pop up with text "question created" will appear
            cy.get('.swal2-popup', { timeout: 5000 }).should('exist').then(() => {
                cy.get('.swal2-html-container').invoke('text').then((text)=>{
                    expect(text).to.equal('question created')
                })
                cy.get('.swal2-popup').contains('button', 'Okay!').click()
            })
            // Evidence - Step 4
            cy.screenshot(`TC-US-006_Step-4-${date}`)
        })
    })
})
