// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-EX-001 - Export', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')

    it('User Can Download Exported Data Of Clothes Detail', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu "Clothes"
            cy.get('.navbar').contains('a', 'Clothes').click()
            cy.url().should('include', '/clothes')
            
            // Step 2: After section with title "All Clothes", there will be list of clothes press button "Detail"
            cy.get('h2').contains('All Clothes')
            cy.get('#clothes_holder .box-clothes').first().find('a.btn-detail').click()
            // Evidence - Step 2
            cy.screenshot(`TC-EX-001_Step-2-${date}`)

            // Step 3: At the detail page, Click button "Download PDF" to export clothes data
            cy.url().should('include', '/clothes/detail')
            cy.get('#clothes_detail_header-section').should('exist').within(()=>{
                cy.get('label').contains('Export Data')
                cy.contains('a','Download PDF').click()
            })

            // Step 4: Success pop up with text "Clothes detail downloaded" will appear
            cy.get('.swal2-popup:not(.swal2-loading)', { timeout: 5000 }).should('exist').then(() => {
                cy.get('.swal2-html-container').invoke('text').then((text)=>{
                    expect(text).to.equal('Clothes detail downloaded')
                })
                cy.get('.swal2-popup').contains('button', 'Okay!').click()
            })
            // Evidence - Step 4
            cy.screenshot(`TC-EX-001_Step-4-${date}`)
        })
    })
})
