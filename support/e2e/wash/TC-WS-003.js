// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-WS-003 - Wash', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')

    it('User Can Delete History of Wash', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu "Clothes"
            cy.get('.navbar').contains('a', 'Clothes').click()
            cy.url().should('include', '/clothes')

            // Step 2: In the Clothes Page, Click button "Wash"
            cy.contains('a','Wash').click()
            cy.url().should('include', '/clothes/wash')
                        
            // Step 3: In the section "History Of Wash", find first item and click the delete button
            cy.get(`#history_of_wash_list-section`).contains('History Of Wash')
            cy.get('#history_of_wash_list-section .wash-box').first().find('button.btn-delete-wash').click()

            // Step 4: In the pop up validation with description "Want to permanentally delete this wash history?", press button "Yes, Delete It!"
            cy.get('.swal2-popup', { timeout: 5000 }).should('exist').then(() => {
                cy.get('.swal2-html-container').invoke('text').then((text)=>{
                    expect(text).to.equal('Want to permanentally delete this wash history?')
                })
                cy.get('.swal2-popup').contains('button', 'Yes, Delete it!').click()
            })
            // Evidence - Step 4
            cy.screenshot(`TC-UH-002_Step-5-${date}`)

            // Step 5: Success pop up with text "clothes used permentally deleted" will appear
            cy.get('.swal2-popup', { timeout: 5000 }).should('exist').then(() => {
                cy.get('.swal2-html-container').invoke('text').then((text)=>{
                    expect(text).to.equal('clothes wash permentally deleted')
                })
                cy.get('.swal2-popup').contains('button', 'Okay!').click()
            })
            // Evidence - Step 5
            cy.screenshot(`TC-UH-002_Step-6-${date}`)
        })
    })
})
