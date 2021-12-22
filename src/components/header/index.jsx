import '../../assets/scss/header.scss';

const Headers = ({ title }) => {
    return (
        <>
            <header className='header-wrapper'>
                <div className="base-title-logo">
                    <img src="https://majoo.id/assets/img/main-logo.png" className='logo' alt="icon" />
                    <h3 className='title-head'>{title}</h3>
                </div>
            </header>
        </>
    )
}

export default Headers;
