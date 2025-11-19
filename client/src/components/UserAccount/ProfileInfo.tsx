import './ProfileInfo.scss';

export const ProfileInfo = () => {
  return(
    <div>
      <div>
        <h2>Your personal data</h2>
      </div>
      <div>
        <form action="">
            <label htmlFor=""></label>
            <input type="text" />
            <label htmlFor=""></label>
            <input type="text" />
            <label htmlFor=""></label>
            <input type="email" />
            <label htmlFor=""></label>
            <input type="number" />

            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select id="gender" name="gender">
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Prefer not to say</option>
              </select>
            </div>

            <div className="dob-group">
  <label>Date of Birth</label>

  <div className="dob-selects">
    <select name="day">
      <option value="">Day</option>
      {Array.from({ length: 31 }, (_, i) => (
        <option key={i + 1} value={i + 1}>{i + 1}</option>
      ))}
    </select>

    <select name="month">
      <option value="">Month</option>
      {Array.from({ length: 12 }, (_, i) => (
        <option key={i + 1} value={i + 1}>
          {i + 1}
        </option>
      ))}
    </select>

    <select name="year">
      <option value="">Year</option>
      {Array.from({ length: 120 }, (_, i) => {
        const year = new Date().getFullYear() - i;
        return <option key={year} value={year}>{year}</option>;
      })}
    </select>
  </div>
</div>


          <div className="title-line"></div>
        </form>
      </div>
    </div>
  )
}