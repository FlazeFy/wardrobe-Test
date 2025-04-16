// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-UH-004 - Used History', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')
    const clothes_name = 'shirt A'

    it('User Can Delete Used History For Specific Clothes', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu "Clothes"
            cy.get('.navbar').contains('a', 'Clothes').click()
            cy.url().should('include', '/clothes')

            // Step 2: Find section "All Clothes", choose and click the first item who have clothes attached
            cy.get('h2').contains('All Clothes')
            cy.get('#clothes_holder .box-clothes').each($el => {
                const clothes_name_text = Cypress.$($el).find('h4').text().trim()

                if (clothes_name_text == clothes_name) {
                    cy.wrap($el).find('.btn-detail').click()
                    return false 
                }
            })

            // Step 3: In the Clothes Detail page, find "Used History", and there will be a table of list used history. Select first item and click delete button at last column
            cy.url().should('include','/clothes/detail')
            cy.get('#used_history-section').should('exist').contains('Used History')
            cy.get('#used_history-table tbody tr').first().find('td').last().find('button').click()  
            // Evidence - Step 3
            cy.screenshot(`TC-UH-004_Step-3-${date}`)

            // Step 4 : In the pop up validation with description "Want to permanentally delete this clothes used history?", press button "Yes, Delete It!"
            cy.get('.swal2-popup', { timeout: 5000 }).should('exist').then(() => {
                cy.get('.swal2-html-container').invoke('text').then((text)=>{
                    expect(text).to.equal('Want to permanentally delete this clothes used history?')
                })
                cy.get('.swal2-popup').contains('button', 'Yes, Delete it!').click()
            })
            // Evidence - Step 4
            cy.screenshot(`TC-UH-004_Step-4-${date}`)

            // Step 5 : Success pop up with text "clothes used history permentally deleted" will appear
            cy.get('.swal2-popup', { timeout: 5000 }).should('exist').then(() => {
                cy.get('.swal2-html-container').invoke('text').then((text)=>{
                    expect(text).to.equal('clothes used history permentally deleted')
                })
                cy.get('.swal2-popup').contains('button', 'Okay!').click()
            })
            // Evidence - Step 5
            cy.screenshot(`TC-UH-004_Step-5-${date}`)
        })
    })
})
