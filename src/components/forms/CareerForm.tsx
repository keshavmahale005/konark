import { useState, type FormEvent } from 'react';
import { ArrowUpRight, CircleCheck, FileText, Upload } from 'lucide-react';
import { Eyebrow } from '../common/SectionTitle';
import { roles } from '../../data/careers';
import { prepareCareerEmail } from '../../services/contactService';

const fields:{name:string;label:string;autoComplete?:string;type?:string;required?:boolean}[]=[
  {name:'firstname',label:'First name',autoComplete:'given-name',required:true},
  {name:'middlename',label:'Middle name',autoComplete:'additional-name'},
  {name:'lastname',label:'Last name',autoComplete:'family-name',required:true},
  {name:'email',label:'Email Id',autoComplete:'email',type:'email',required:true},
  {name:'mobile',label:'Mobile',autoComplete:'tel',type:'tel',required:true},
  {name:'experience',label:'Experience'}
];

// The selected post is controlled by the page so job cards can preselect it.
export default function CareerForm({post,onPostChange}:{post:string;onPostChange:(post:string)=>void}){
  const [status,setStatus]=useState(''),[fileName,setFileName]=useState('');
  function apply(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    const href=prepareCareerEmail(new FormData(event.currentTarget));
    setStatus('Your email application should open. Attach your CV to the email before sending.');
    window.location.href=href;
  }
  return <div className="ct-form cr-form">
    <Eyebrow>Career application</Eyebrow>
    <h2>Send your application</h2>
    <p className="cr-form__intro">Prepare an email to HR. Attach your CV to the email before sending; this site does not upload files to a server.</p>
    <form className="ct-form__grid" onSubmit={apply}>
      {fields.map(({name,label,autoComplete,type='text',required})=><label className="ct-field" key={name}>
        <span>{label}{required&&<b aria-hidden="true">*</b>}</span>
        <input name={name} type={type} autoComplete={autoComplete} required={required}/>
      </label>)}
      <label className="ct-field cr-field--wide">
        <span>Applied post</span>
        <select name="post" value={post} onChange={event=>onPostChange(event.target.value)}>
          <option value="" disabled>Select a position</option>
          {roles.map(({role})=><option key={role}>{role}</option>)}
          <option>General application</option>
        </select>
      </label>
      <label className="ct-field cr-field--wide cr-file">
        <span>CV file</span>
        <span className={`cr-file__drop${fileName?' has-file':''}`}>
          {fileName?<FileText size={20} aria-hidden="true"/>:<Upload size={20} aria-hidden="true"/>}
          <span>{fileName||'Choose a PDF or Word file'}</span>
        </span>
        <input name="cv" type="file" accept=".pdf,.doc,.docx" onChange={event=>setFileName(event.target.files?.[0]?.name??'')}/>
      </label>
      <button className="hp-btn hp-btn--primary ct-form__submit" type="submit">Prepare email <ArrowUpRight size={17}/></button>
      {status&&<p className="ct-form__notice cr-field--wide" role="status"><CircleCheck size={18} aria-hidden="true"/>{status}</p>}
    </form>
  </div>;
}
