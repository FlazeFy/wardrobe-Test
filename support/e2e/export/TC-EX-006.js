// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-EX-006 - Export', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')

    it('User Can Download Exported Data Of Clothes Calendar per Date', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu button that contain username to open the Profile Page
            cy.get('.navbar').contains('a', 'Calendar').click()
            cy.url().should('include', '/calendar')

            // Step 2: At the calendar table, find a day with clothes history or schedule inside the date. Click the print button in the last column
            cy.get('#calendar-table tbody tr').then($rows => {
                Cypress._.some($rows, $tr => {
                    const tds = Cypress.$($tr).find('td')
                    let hasColInsideRow = false
                
                    for (let i = 1; i <= 5; i++) {
                        const $row = Cypress.$(tds[i]).find('.row')
                        if ($row.find('[class*="col-"]').length > 0) {
                            hasColInsideRow = true
                            break
                        }
                    }
                
                    if (hasColInsideRow) {
                        cy.wrap(tds[6]).find('.btn-print').click()
                        return true 
                    }
                
                    return false
                })
            })

            // Step 3: Success pop up with text "Apps data downloaded" will appear
            cy.get('.swal2-popup:not(.swal2-loading)', { timeout: 5000 }).should('exist').then(() => {
                cy.get('.swal2-html-container').invoke('text').then((text)=>{
                    expect(text).to.equal('Calendar daily report downloaded')
                })
                cy.get('.swal2-popup').contains('button', 'Okay!').click()
            })
            // Evidence - Step 3
            cy.screenshot(`TC-EX-006_Step-3-${date}`)
        })
    })
})
