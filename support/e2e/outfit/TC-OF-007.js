// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-OF-007 - Outfit', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')

    it('User Can Use a Outfit', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu "Clothes"
            cy.get('.navbar').contains('a', 'Clothes').click()
            cy.url().should('include', '/clothes')

            // Step 2: In the Clothes Page, Click button "Generated Outfit"
            cy.contains('a','Generated Outfit').click()
            cy.url().should('include', '/clothes/generated')
            // Evidence - Step 2
            cy.screenshot(`TC-OF-007_Step-2-${date}`)

            // Step 3: Find section "My Outfit", choose and click the first item who have clothes attached
            cy.get('h1').contains('My Outfit')
            cy.get('#outfit-holder .box-clothes').each($el => {
                const hasCol = Cypress.$($el).find('.clothes-holder [class^="col-"]').length > 0
                if (hasCol) {
                    cy.wrap($el).click()
                    return false 
                }
            })
            
            // Step 4: In the specific Outfit Detail Page, click button "Use This Outfit"
            cy.url().should('include','clothes/outfit')
            cy.contains('button','Use this Outfit').click()
            // Evidence - Step 4
            cy.screenshot(`TC-OF-007_Step-4-${date}`)
            
            // Step 5 : In the pop up validation with title "Do you want to use this Outfit?" and description "Do you want to use this Outfit?", press button "Yes, Used It!"
            cy.get('.swal2-popup', { timeout: 5000 }).should('exist').then(() => {
                cy.get('.swal2-title').invoke('text').then((text)=>{
                    expect(text).to.equal('Do you want to use this Outfit?')
                })
                cy.get('.swal2-html-container').invoke('text').then((text)=>{
                    expect(text).to.equal('We well also add per clothes attached')
                })
                cy.get('.swal2-popup').contains('button', 'Yes, Used it!').click()
            })
            // Evidence - Step 5
            cy.screenshot(`TC-OF-007_Step-5-${date}`)

            // Step 6 : Success pop up with text "outfit history created with n clothes attached" will appear
            cy.get('#attached_clothes-section .row .box-clothes').its('length').then(total_clothes => {
                cy.get('.swal2-popup', { timeout: 5000 }).should('exist').then(() => {
                    cy.get('.swal2-html-container').invoke('text').then((text)=>{
                        expect(text).to.equal(`outfit history created with ${total_clothes} clothes attached`)
                    })
                    cy.get('.swal2-popup').contains('button', 'Okay!').click()
                })
            })
            // Evidence - Step 6
            cy.screenshot(`TC-OF-006_Step-6-${date}`)
        })
    })
})
