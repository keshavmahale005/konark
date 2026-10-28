// No verified server endpoint exists, so the contact form prepares a mailto: draft the visitor reviews and sends themselves.
export function prepareEnquiryEmail(data:FormData){
  const body=[`First name: ${data.get('firstname')}`,`Middle name: ${data.get('middlename')||''}`,`Last name: ${data.get('lastname')}`,`Email: ${data.get('email')}`,`Mobile: ${data.get('mobile')}`,`City: ${data.get('city')||''}`].join('\n');
  return `mailto:enquiry@konarkglobal.com?subject=${encodeURIComponent('Website enquiry')}&body=${encodeURIComponent(body)}`;
}

// Career applications: same draft as the career form has always prepared; the applicant attaches their CV in their email app.
export function prepareCareerEmail(data:FormData){
  const post=String(data.get('post')||'Career enquiry');
  const body=[
    `First name: ${data.get('firstname')}`,
    `Middle name: ${data.get('middlename')||''}`,
    `Last name: ${data.get('lastname')}`,
    `Email: ${data.get('email')}`,
    `Mobile: ${data.get('mobile')}`,
    `Experience: ${data.get('experience')||''}`,
    `Applied post: ${post}`,
    `CV selected: ${data.get('cv') instanceof File?(data.get('cv') as File).name:'No file selected'}`,
    'Please attach your CV to the email before sending.'
  ].join('\n');
  return `mailto:hr@konarkglobal.com?subject=${encodeURIComponent(`Application: ${post}`)}&body=${encodeURIComponent(body)}`;
}

export const roleApplicationMailto=(role:string)=>`mailto:hr@konarkglobal.com?subject=${encodeURIComponent(`Application: ${role}`)}`;
