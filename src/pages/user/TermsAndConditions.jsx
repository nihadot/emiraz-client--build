import React, { useEffect } from "react";
import Header from "../../components/user/Header";
import Footer from "../../components/Footer";

function TermsAndConditions() {

    useEffect(()=>{
        window.scrollTo(0, 0);
    },[])
  return (
    <div>
      <div className="w-full">
        <div className="mt-4 mx-6">
          <Header />
        </div>
        <h1 className="text-center mt-4 sf-medium-600 text-[30px] sm:text-[70px]">
        Terms And Conditions
        </h1>
        <section className="max-w-[1300px] w-full m-auto">
          <div className="mx-6 flex flex-col justify-start my-4 lg:my-14 items-start md:mx-20 lg:mx-28 ">
            <section className="grid  grid-cols-1 ">
              <div className="">
                 <div className="pb-4">
                    <h1 className="pb-2 text-[25px] font-bold sf-bold">1. TERMS</h1>
                    <p className="pb-2 font-medium text-[15px] poppins text-[#666666]">
                        1.1 The term mentioned here as ‘we’,’our’ and ‘us’ would mean ‘The Property Seller's, its representatives, subsidiaries, agents, affiliates or its assigned parties.
                    </p>
                    <p className="pb-2 font-medium text-[15px] poppins text-[#666666]">
                        1.2 The website and its contents is herein referred to as ‘www.propertyseller.ae’.
                    </p>
                    <p className="pb-2 font-medium text-[15px] poppins text-[#666666]">
                        1.3 With using the website you agree to bind by the website’s terms of use and its privacy policy and agree to comply with all the applicable governing rules. All the content contained in this website is protected by copyright and trademark law.
                    </p>

                    <p className="pb-2 font-medium text-[15px] poppins text-[#666666]">
                        1.4 The site is open to be used by people above the age of 18 unless legally restricted from using the site under the laws of the country of your residence.
                    </p>
                 </div>

                 <div className="pb-4">
                    <h1 className="pb-2 text-[25px] font-bold sf-bold">2. USE LICENSE & RESTRICTIONS:</h1>
                    <p className="pb-2 font-medium text-[15px] poppins text-[#666666]">
                    2.1 The materials contained in the site can be temporarily downloaded for personal and non-commercial viewing only, which does not imply: <br />
                    a) Modifying or copying the contents <br />
                    b) To use for any kind of display both commercial and non-commercial <br />
                    c) Manipulate the website or its functionalities in any way. <br /> 
                    d) Remove copyright or trademarks. <br />
                    e) Transfer of materials to any entity or server. <br />
                    </p>
                    <p className="pb-2 font-medium text-[15px] poppins text-[#666666]">
                    2.2 In using the website, you agree to undertake not to engage in the following activities: <br />
                    a) Engage in any activities that will tamper the contents, infrastructure or the working of the site. <br />
                    b) Manipulate the contents, database or functionality of the website for any unauthorized activities. <br />
                    c) Infringe upon any person’s or property right including copyright, trade secret, privacy right. <br />
                    d) Impersonate to extrude money, passwords or personal information from any person, entity or enterprise. <br />
                    e) Create any kind of virus or malware intended to transmit destroying the site. <br />
                    </p>
                 </div>


                 <div className="pb-4">
                    <h1 className="pb-2 text-[25px] font-bold sf-bold">3. YOUR RESPONSIBILITIES</h1>
                    <p className="pb-2 font-medium text-[15px] poppins text-[#666666]">
                        3.1 We do ot claim to be a real estate agency, we only provide services where agents can market. You may view the details of the property along with the other contents provided in the website. The third parties and the agencies are responsible for the details provided and the retrieving the enquiries from you. We only facilitate the generation of the enquiry and do not form part of the conversation, deal or transaction between you and the agency.
                    </p>
                    <p className="pb-2 font-medium text-[15px] poppins text-[#666666]">
                        3.2 All the details posted in the website are directly provided by the agencies/third parties and are uploaded in good faith. Though we put in good effort to verify the details, it is your responsibility to make your own enquiries and verify the same. We offer no guarantee on the accuracy of the information provided by the third parties / agencies.
                    </p>
                    <p className="pb-2 font-medium text-[15px] poppins text-[#666666]">
                        3.3 We expect good demeanor and to act in good faith towards the agencies.
                    </p>
                 </div>


                 <div className="pb-4">
                    <h1 className="pb-2 text-[25px] font-bold sf-bold">5. REVISIONS AND ERRATA</h1>
                    <p className="pb-2 font-medium text-[15px] poppins text-[#666666]">
                    The details contained in the site could have some typographical, or photographic errors. We do not claim any accuracy to the details published.Changes may be made in the site from time to time without any prior notice.
                    </p>
                 </div>

                 <div className="pb-4">
                    <h1 className="pb-2 text-[25px] font-bold sf-bold">6. AVAILABILITY OF WEBSITE</h1>
                    <p className="pb-2 font-medium text-[15px] poppins text-[#666666]">
                        The website and its services will be available to you round the clock, but in case of any updates, we would put our best efforts to intimate you beforehand but cannot guarantee fault free continuous services. Maintenance works and updations would require attention and might interrupt service or lead to data loss. It is in our discretion to change or discontinue any part of the website or the services which would also mean your access to the site and its services.
                    </p>
                 </div>

                 <div className="pb-4">
                    <h1 className="pb-2 text-[25px] font-bold sf-bold">7. THIRD PARTY ADVERTISEMENTS</h1>
                    <p className="pb-2 font-medium text-[15px] poppins text-[#666666]">
                    We do not endorse any advertisements or links that appear in the site advertisements on our Website.We also do not take up any responsibilities for any warranties or representations of advertisements made by any third party or agencies. It is the sole discretion of the user to verify the details before entering into any contract or purchase of the product. Information published in our publications, posts, or inserts should not be considered as a substitute for professional legal, financial or real estate advice.
                    </p>
                 </div>

                 <div className="pb-4">
                    <h1 className="pb-2 text-[25px] font-bold sf-bold">8. SITE TERMS OF USE MODIFICATIONS</h1>
                    <p className="pb-2 font-medium text-[15px] poppins text-[#666666]">
                        The terms of use or any such terms with respect to the Website is subject to changes at any time without notice. By using the website and its services you agree to be bound by the Terms of Use.
                    </p>
                 </div>


                 <div className="pb-4">
                    <h1 className="pb-2 text-[25px] font-bold sf-bold">9. CONTRIBUTIONS</h1>
                    <p className="pb-2 font-medium text-[15px] poppins text-[#666666]">
                        9.1 ‘ Contributions’, the term here in these ‘Terms of Use’, pertains to any kind of information that includes data,text, video, images or any other material that was permitted to be uploaded, shared, published, or saved in the website.
                    </p>
                    <p className="pb-2 font-medium text-[15px] poppins text-[#666666]">
                        9.2 The said contributions can at any time be removed, altered or denied access to you without any prior notice and we reserve the right to do so without any intimations or communications pertaining to it if found: <br />
                        a) That the contentiousContributions are in violation of any law or regulation; <br />
                        b) That the Contributions encroach upon the intellectual property rights of any third party; <br />
                        c) That it is required to do so by an authority or any regulatory body, to take-down the contents in the contribution, that are <br />

                        <ol >
                            <li >
                                1.misleading
                            </li>
                            <li>
                                2.inappropriate with respect to the purpose of our Website;
                            </li>
                            <li>
                                3.Offensive and obscene
                            </li>
                            <li>
                                4.Incorrect matter;
                            </li>
                            <li>
                                5.Unlawful content as per the norms and conduct of a particular region.
                                Malicious, any kind of spyware that can corrupt the website.
                            </li>
                        </ol>
                    </p>

                    <p className="pb-2 font-medium text-[15px] poppins text-[#666666]">
                    9.3 With ‘Contributions that satisfy all norms, you offer us an exclusive right over the content that grants us a royalty free , irrevocable, perpetual and transferable license to reproduce, modify, distribute and publish, display and publicize your content across the world through any medium.
                    </p>

                    <p className="pb-2 font-medium text-[15px] poppins text-[#666666]">
                        9.4 Each user of the website has the right to use your name or the one attached to your content along with the right to represent and warranty that: <br />
                        1. you are in absolute control and ownership of the contents in the Contributions. <br />
                        2. you are in possession of all the necessary licenses, rights, that grants you permission to use and authorize us to publicize your Contributions. <br />
                    </p>

                    <p className="pb-2 font-medium text-[15px] poppins text-[#666666]">
                        9.5 In case of any Contributions that you retain moral rights over, then , you declare that:
                        No information that is personally related is contained in the Contribution, or any related work, that is an updation of the Contribution; and
                        You accept and agree that we do not have any control of and are not responsible for the tampering or use of these Contributions by any third party or user.
                    </p>

                    <p className="pb-2 font-medium text-[15px] poppins text-[#666666]">                    
                        9.6 You represent and warrant that: <br />
                        1. you have the lawful right including all necessary licenses, rights, consents and permissions to use and authorize us to display your Contributions; <br />
                        2. You will not make any Contributions that violates the rights of any third party, and that you will pay all royalties, fees or other payable <br />
                         amount for the Contributions made by you; and <br />
                        3. Your Contributions will not contain any contents <br />

                        1. Misleading <br />
                        2. Deceptive <br />
                        3.Incorrect <br />
                        4.Offensive <br />
                        5.directly or indirectly related to any advertising or marketing of any products or services <br />
                        6.Obscene, that includes pornographic, hate, racial or ethnically offensive materia <br />
                        7.Defamatory or <br />
                        8.Unlawful or that which encourages unlawful conduct. <br />
                    </p>

                    


                    
                 </div>



                 <div className="pb-4">
                    <h1 className="pb-2 text-[25px] font-bold sf-bold">10. INTELLECTUAL PROPERTY</h1>
                    <p className="pb-2 font-medium text-[15px] poppins text-[#666666]">
                        10.1 Unless otherwise expressed, all contents of the Website are copyrights, trademarks, trade dress or any other intellectual property owned and controlled by us, or one of our associates or by third parties who have entered into agreement with us and are protected by the applicable laws.
                    </p>
                    <p className="pb-2 font-medium text-[15px] poppins text-[#666666]">
                    10.2 We, along with our suppliers and licensors have absolute authority over all intellectual property rights in all contexts, programs, products, processes, technology, content and any other materials, which appear here in the site. Having access to this Website does not mean conferring upon any right to anyone under any conditions or any third party's intellectual property rights. Using the contents of this website, including copying or saving them in whole or part, other than for your own personal, non-commercial use, is not permitted without our consent. You may not alter, propagate or re-post anything on this site for any purposes.
                    </p>

                    <p className="pb-2 font-medium text-[15px] poppins text-[#666666]">
                    10.3 The Names and logos and all related product and service names, design marks and slogans are our trademarks or service marks belonging to us or our licensors.
                    </p>

                    <p className="pb-2 font-medium text-[15px] poppins text-[#666666]">
                        10.4 Access to this Website does not authorize anyone to use any name, logo or mark in any manner.
                    </p>
                 </div>



                 <div className="pb-4">
                    <h1 className="pb-2 text-[25px] font-bold sf-bold">11. ELECTRONIC COMMUNICATIONS</h1>
                    <p className="pb-2 font-medium text-[15px] poppins text-[#666666]">
                        By using the website or sending us mails, you are engaging with us through the electronic media. Our communications with you are basically through emails or through posts on the web-sites. With communicating with us you consent to receive electronically any communications related to the use of our site. Any communication from us is intended for receipt by you and shall be deemed delivered and effective when sent to the email address you provide on the Website for your account
                    </p>
                 </div>

                 <div className="pb-4">
                    <h1 className="pb-2 text-[25px] font-bold sf-bold">12. INDEMNITY</h1>
                    <p className="pb-2 font-medium text-[15px] poppins text-[#666666]">
                    12.1 This is to state that you agree to indemnify and hold us and our affiliates (which will include our officers, agents, partners and employees) against any and all loss, liability or claim that includes the attorney’s fees, in connection with the use of and access to our Website or in relation to the Contributions that are not in accordance with the Terms.
                    </p>
                 </div>

                 <div className="pb-4">
                    <h1 className="pb-2 text-[25px] font-bold sf-bold">13. DISCLAIMER</h1>
                    <p className="pb-2 font-medium text-[15px] poppins text-[#666666]">
                        The contents and the property are advertised in the website as and when they are made available. We assure no warranty, or claim to include the veracity or non-infringement of intellectual property or that which is in violation of any rights. We also do not offer any assurances on the accuracy or reliability of the materials published or linked with this site.
                    </p>
                 </div>

                 <div className="pb-4">
                    <h1 className="pb-2 text-[25px] font-bold sf-bold">14. MONITORING AND RECORDING TELEPHONE CALLS</h1>
                    <p className="pb-2 font-medium text-[15px] poppins text-[#666666]">
                    Calls of Real Estate Agents or Brokers who are engaged in our call tracking services and who have agreed to generate enquiries through our website, will be recorded for training and assistance. The calls will be recorded only with prior consent and will be reminded of the recordings before a conversation.
                    </p>
                 </div>

                 <div className="pb-4">
                    <h1 className="pb-2 text-[25px] font-bold sf-bold">15. GOVERNING LAW</h1>
                    <p className="pb-2 font-medium text-[15px] poppins text-[#666666]">
                    15.1 The Terms of use listed here and your access to the Website are subject to the jurisdiction of the laws in the United Arab Emirates as applicable anywhere in the Emirate of Dubai. Any dispute regarding the Terms of Use can be raised and challenged within its jurisdiction in the courts of Dubai.
15.2 In case any terms mentioned in the agreement become invalid, out of reason, or unenforceable under law , the maintainability of the remaining law will not be affected.
                    </p>
                 </div>


                 <div className="pb-4">
                    <h1 className="pb-2 text-[25px] font-bold sf-bold">16. CONTACT US</h1>
                    <p className="pb-2 font-medium text-[15px] poppins text-[#666666]">
                        16.1 As a real estate agency we have a valid license to sell and manage properties and execute deals. Our contractors are contractually obliged to list properties that are available for or lease with proper authentication from the property owner and the concerned governmental authorities. We expect all the properties listed in the site to be its original portrayal, with the right information provided on the proposed transaction. Incase you come across any misleading information, wrong portrayal or suspected misrepresentation of any of the properties listed in the website, please feel free to inform us with the details to abuse@propertyseller.ae For any queries, complaints or recommendations about these Terms of Use, please contact us at the following address: info@propertyseller.ae
                    </p>
                 </div>
                 
                 
                  

                  
              </div>
            </section>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
}

export default TermsAndConditions;
