// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-US-008 - User', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')
    const question = 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.'

    it('User Cant Post A Question With Input Character Length More Than Maximum Limit', () => {
        // Pre Condition : User Must Logged In To Their Account
        // Maximum Limit of Question is 500 Character Length
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu button that contain username to open the Profile Page
            cy.get('.navbar').contains('a', username).click()
            cy.url().should('include', '/profile')

            // Step 2: In the "Ask A Question" section, user can see form of add question. Type empty space in the form
            cy.get(`#send_question-section`).contains('Ask A Question')
            cy.get('#send_question-section #question-input').type(question)
            cy.screenshot(`TC-US-008_Step-2-${date}`)

            // Step 3: Click the "Send Question" button
            cy.get('#send_question-section').contains('button','Send Question').click()

            // Step 4: Failed pop up with text "The question field must not be greater than 500 characters" will appear
            cy.get('.swal2-popup', { timeout: 5000 }).should('exist').then(() => {
                cy.get('.swal2-html-container').invoke('text').then((text)=>{
                    expect(text).to.include('The question field must not be greater than 500 characters')
                })
                cy.get('.swal2-popup').contains('button', 'Okay!').click()
            })
            // Evidence - Step 4
            cy.screenshot(`TC-US-008_Step-4-${date}`)
        })
    })
})
