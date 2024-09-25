import React from 'react'
import { errorToast } from '../../toast';
import Lazyloading from '../Lazyloading/Lazyloading';
import { addingEnquiry } from '../../api';
import PhoneInput from 'react-phone-input-2';
import { CloseSVG } from '../../assets/icons';

function Modal({setDeveloperId,setModal,propertyUniqueID,setSuccessCLoseModal,setPropertyUniqueID,developerId}) {

  const [number, setNumber] = React.useState("");
  const [formIsLoading, setFormIsLoading] = React.useState(false);
  const [name, setName] = React.useState("");

    const handleSubmit = async (e) => {
        try {
          e.preventDefault();
    
          if (!name) return errorToast("Name is required");
          if (name.length < 3)
            return errorToast("Minimum three chracters mustbe entered");
          if (!number) return errorToast("Mobile number is required");
          if (number.length > 20)
            return errorToast("Mobile number is no morethan 20");
          if (number.length < 10) return errorToast("10 digits required");
    
          setFormIsLoading(true)
          let data = {
            name,
            number,
            propertyId: propertyUniqueID,
            developerId,
          };
    
          await addingEnquiry(data);
    
          setName("");
          setNumber("");
          setModal(false);
          setSuccessCLoseModal(true);
          setFormIsLoading(false)
          setDeveloperId("")
          setPropertyUniqueID("")
    
        } catch (error) {
          console.log(error.message);
          setFormIsLoading(false)
    
        }
      };

      const closeRegister = () => {
        setModal(false);
        setSuccessCLoseModal(false);
        setPropertyUniqueID("");
        setDeveloperId("");
      };

  return (
    <div
                className="w-full h-screen z-50 fixed top-0  flex justify-center items-center left-0"
                style={{ background: "rgba(0,0,0,0.9" }}
              >
                <form
                  onSubmit={handleSubmit}
                  className="rounded-[20px] md:py-7 py-4 max-w-[820px] w-[90%] lg:w-full   h-auto flex flex-col  bg-white md:px-8 px-4 "
                >
                  <div className="justify-between w-ful flex text-[24px] md:text-[30px] md:mb-4 mb-2 sf-medium ">
                    <p className=''>Register Your Interest</p>
                    <p>
                      {" "}
                      <Lazyloading
                        onClick={closeRegister}
                        src={CloseSVG}
                        alt={"close"}
                        className="w-6 h-6 cursor-pointer"
                      />{" "}
                    </p>
                  </div>
                  <input
                    type="text"
                    autoFocus={true}
                    disabled={formIsLoading}
                    name={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                    className="mb-1 outline-none w-[100%] py-4 px-5  appearance-none border border-[#E4E4E4] text-xs poppins rounded-[10px]"
                  />
                  <PhoneInput
                country={"ae"}
                    placeholder="Phone"
                    disabled={formIsLoading}
                    autoFormat={false}
                    countryCodeEditable={false}
                    inputProps={{
                      require: true,
                     
                      name: "Phone",
                    }}
                    buttonClass="!border-none !bg-transparent"
                    inputClass="!outline-none  !border-none !w-full"
                    containerClass="!outline-none !w-[100%] !py-[8px] !px-[10px] !appearance-none !border !border-[#E4E4E4] !text-xs !poppins !rounded-[10px]"
                    onChange={(phone) => setNumber(phone)}
                  />

                  <input
                    type="submit"
                    value={ formIsLoading ? "Submiting..." : "Submit"}
                    disabled={formIsLoading}
                    className="outline-none cursor-pointer w-[100%] py-4 px-5  appearance-none border bg-black text-white mt-2 text-xs poppins rounded-[10px]"
                  />
                </form>
              </div>
  )
}

export default Modal