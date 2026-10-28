import { useState, type FormEvent } from 'react';
import { ArrowUpRight, CircleCheck, Info } from 'lucide-react';
import { Eyebrow } from '../common/SectionTitle';
import { prepareEnquiryEmail } from '../../services/contactService';

const fields:{name:string;label:string;autoComplete:string;type?:string;required?:boolean}[]=[
  {name:'firstname',label:'First name',autoComplete:'given-name',required:true},
  {name:'middlename',label:'Middle name',autoComplete:'additional-name'},
  {name:'lastname',label:'Last name',autoComplete:'family-name',required:true},
  {name:'email',label:'Email Id',autoComplete:'email',type:'email',required:true},
  {name:'mobile',label:'Mobile',autoComplete:'tel',type:'tel',required:true},
  {name:'city',label:'City',autoComplete:'address-level2'}
];

export default function ContactForm(){
  const [notice,setNotice]=useState('');
  function send(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    window.location.href=prepareEnquiryEmail(new FormData(event.currentTarget));
    setNotice('Your email application should open with the enquiry details. Review the message and send it from your email account.');
  }
  return <div className="ct-form">
    <Eyebrow>We love to hear</Eyebrow>
    <h3>Send a message</h3>
    <form className="ct-form__grid" onSubmit={send}>
      {fields.map(({name,label,autoComplete,type='text',required})=><label className="ct-field" key={name}>
        <span>{label}{required&&<b aria-hidden="true">*</b>}</span>
        <input name={name} type={type} autoComplete={autoComplete} required={required}/>
      </label>)}
      <button className="hp-btn hp-btn--primary ct-form__submit" type="submit">Prepare email <ArrowUpRight size={17}/></button>
    </form>
    <p className="ct-form__note"><Info size={16} aria-hidden="true"/>This opens your email application; your message is sent only after you review and send it.</p>
    {notice&&<p className="ct-form__notice" role="status"><CircleCheck size={18} aria-hidden="true"/>{notice}</p>}
  </div>;
}
