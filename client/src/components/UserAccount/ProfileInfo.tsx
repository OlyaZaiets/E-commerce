import './ProfileInfo.scss';

export const ProfileInfo = () => {
  return(
    <div>
      <div>
        <h2>Your personal data</h2>
      </div>
      <form action=''>
        <div className='main-user-info'> 
          <div className='user-first-name'>
            <label htmlFor=''>First Name</label>
            <input type='text' />
          </div>

          <div className='user-last-name'>
            <label htmlFor=''>Last Name</label>
            <input type='text' />
          </div>

          <div className='user-email'>
            <label htmlFor=''>Email</label>
            <input type='email' />
          </div>

          <div className='user-phone-number'>
            <label htmlFor=''>Phone number</label>
            <input type='number' />
          </div>

          <div className='user-gender'>
            <label htmlFor='gender'>Gender</label>
            <select id='gender' name='gender'>
            <option value=''>Select gender</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value='other'>Prefer not to say</option>
            </select>
          </div>

          <div className='user-birthday'>
            <label>Date of Birth</label>

            <div className='dob-selects'>
              <select name='day'>
                <option value=''>Day</option>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>

              <select name='month'>
                <option value=''>Month</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>

              <select name='year'>
                <option value=''>Year</option>
                {Array.from({ length: 120 }, (_, i) => {
                  const year = new Date().getFullYear() - i;
                  return <option key={year} value={year}>{year}</option>;
                })}
              </select>
            </div>
          </div>
        </div>

        <div className='title-line'></div>
        <h1>Change Password</h1>
        <button className='dark-btn' type='submit'>Submit</button>
      </form>
    </div>
  )
}