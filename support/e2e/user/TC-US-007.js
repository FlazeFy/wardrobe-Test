// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-US-007 - User', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')
    const question = ' '

    it('User Cant Post A Question With Empty Input', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu button that contain username to open the Profile Page
            cy.get('.navbar').contains('a', username).click()
            cy.url().should('include', '/profile')

            // Step 2: In the "Ask A Question" section, user can see form of add question. Type empty space in the form
            cy.get(`#send_question-section`).contains('Ask A Question')
            cy.get('#send_question-section #question-input').type(question)
            cy.screenshot(`TC-US-007_Step-2-${date}`)

            // Step 3: Click the "Send Question" button
            cy.get('#send_question-section').contains('button','Send Question').click()

            // Step 4: Failed pop up with text "The question field is required" will appear
            cy.get('.swal2-popup', { timeout: 5000 }).should('exist').then(() => {
                cy.get('.swal2-html-container').invoke('text').then((text)=>{
                    expect(text).to.include('The question field is required')
                })
                cy.get('.swal2-popup').contains('button', 'Okay!').click()
            })
            // Evidence - Step 4
            cy.screenshot(`TC-US-007_Step-4-${date}`)
        })
    })
})
