const fs = require('fs')

const auditRecordSheet = (props) => {
    const date = new Date().toLocaleDateString('en-GB', { 
        day: '2-digit', month: '2-digit', year: 'numeric' 
    }).split('/').reverse().join('-') 

    const exec_date = new Date().toLocaleString('en-GB', { 
        day: '2-digit', month: 'long', year: 'numeric', 
        hour: '2-digit', minute: '2-digit', hour12: false 
    })

    const path = `tests_reports/csv/template-report-${date}.csv`
    const headers = ['ID', 'Request Name', 'Method', 'Endpoint', 'Test Case', 'Type', 'Test Data', 'Preconditions', 'Test Step', 'Expected Result', 'Actual Result', 'Test Status', 'Tested At', 'Note']
    const record = [props.id, props.request_name, props.method, props.endpoint, props.test_case, props.type, props.test_data, props.pre_condition, props.test_step, props.expected_result, props.actual_result, props.test_status, exec_date, props.note]

    if (!fs.existsSync(path)) {
        fs.writeFileSync(path, headers.join(',') + '\n', 'utf8')
    }
    
    fs.appendFileSync(path, record.join(',') + '\n', 'utf8')
}

module.exports = { auditRecordSheet }
