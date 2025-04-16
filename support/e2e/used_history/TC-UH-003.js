// Components
import { generateRules } from '../../components/generate'
import '../../components/template'

describe('Wardrobe E2E Test - TC-UH-003 - Used History', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')
    const clothes_name = 'shirt A'

    it('User Can See Used History For Specific Clothes', () => {
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

            // Step 3: In the Clothes Detail page, find "Used History" section and there will be a table that contain context, notes, used at, and delete button
            cy.url().should('include','/clothes/detail')
            cy.get('#used_history-section').should('exist').contains('Used History')
            const expected_header = ['Context','Notes','Used At','Delete']
            cy.get('#used_history-table thead th').each(($th, idx) => {
                cy.wrap($th).invoke('text').then((text) => {
                    expect(text.trim()).to.equal(expected_header[idx])
                })
            })
            cy.get('#used_history-table tbody tr').each(($tr) => {
                // Context
                cy.wrap($tr).find('td').first().invoke('text').then(text => {
                    const used_context = text.trim().toLowerCase()
                    
                    const used_context_dct = generateRules('used_context').map(c => c.toLowerCase())
                    expect(used_context).to.not.equal('')
                    expect(used_context_dct).to.include(used_context)
                })                
                // Notes
                cy.wrap($tr).find('td').eq(1).invoke('text').then(text => {
                    const trimmed = text.trim()
                    expect(trimmed).to.satisfy(t => t === '- No Notes Provided -' || t.length > 0)
                })
                // Used At
                cy.wrap($tr).find('td').eq(2).then((text) => {
                    expect(text).to.not.equal('')
                })
                // Delete Button
                cy.wrap($tr).find('td').last().within(() => {
                    cy.get('button').first().should('have.class', 'btn-delete')
                })
            })

            // Evidence - Step 3
            cy.screenshot(`TC-UH-003_Step-3-${date}`)
        })
    })
})
