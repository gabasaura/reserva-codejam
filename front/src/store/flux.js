import { toast } from "react-toastify";

const getState = ({ getStore, getActions, setStore }) => {

	return {
		store: {
			url: 'http://127.0.0.1:3000',
			email: '',
			password: "",
			repeatPassword: "",
			current_user: null,
			access_token: null,
			error: '',
			reservations: []
		},
		actions: {
			handleChange: (e) => {
				const { name, value } = e.target;
				setStore({
					[name]: value
				});
			},
			cancelForm: () => {
				const { setStore } = getActions();
				setStore({
					email: "",
					password: "",
					error: ""
				});
			},


            validateForm: () => {
                const { email, password, repeatPassword } = getStore();
                if (!email.trim() || !getActions().isValidEmail(email)) {
                    setStore({ error: "Please enter a valid email address." });
                    toast.error("Please enter a valid email address.")
                    return true; // Form is invalid
                }

                if (!password.trim() || password.length < 6) {
                    setStore({ error: "Password must be at least 6 characters." });
                    toast.error("Password must be at least 6 characters.")
                    return true; // Form is invalid
                }
                if (password !== repeatPassword) {
                    setStore({ error: "Password doesn't match" });
                    toast.error("Password doesn't match")
                    return true; // Form is invalid
                }
                return false; // Form is valid
            },
            isValidEmail: (email) => {
                // Basic email validation regex pattern
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailPattern.test(email);
            },
            handleLogin: async (e) => {
                e.preventDefault();
                const { email, password, url } = getStore(); 
                const { actions } = getActions();
                console.log({ email, password });

                if (!actions.validateForm()) {
                    console.log("Form submitted successfully!");

                    const loginUrl = `${url}/login`; // Corregido para agregar `/login`
                    const options = {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ email, password })
                    };

                    try {
                        const response = await fetch(loginUrl, options);
                        const data = await response.json();
                        console.log('Usuario logueado Con Éxito', data);
                        actions.cancelForm(); // Clear form fields
                    } catch (error) {
                        console.error('Log in Error:', error);
                    }
                }
            },
            handleRegister: async (e) => {
                e.preventDefault();
                const { name, email, password, repeatPassword } = getStore();
                const { register, validateForm } = getActions();
                if (!validateForm()) register({ email, password, name, repeatPassword });
            },
            checkCurrentUser: () => {
                if (sessionStorage.getItem('access_token')) {
                    setStore({
                        access_token: sessionStorage.getItem('access_token'),
                        current_user: JSON.parse(sessionStorage.getItem('current_user'))
                    });
                }
            },
            login: async (credentials) => {
                try {
                    const { url } = getStore();
                    const options = {
                        method: 'POST',
                        body: JSON.stringify(credentials),
                        headers: {
                            'Content-type': 'application/json'
                        }
                    };

                    const response = await fetch(`${url}/auth/login`, options); // Corregido para agregar `/login`
                    const data = await response.json();

                    if (data.msg) {
                        toast.error(data.msg);
                    } else {
                        const { access_token, user } = data;
                        setStore({
                            access_token,
                            current_user: user,
                            email: '',
                            password: '',
                        });
                        sessionStorage.setItem('access_token', access_token);
                        sessionStorage.setItem('current_user', JSON.stringify(user));
                        toast.success("Log In Successful");
                    }

                } catch (error) {
                    console.log(error.message);
                }
            },
            register: async (credenciales) => {
                try {
                    const { url } = getStore();
                    const options = {
                        method: 'POST',
                        body: JSON.stringify(credenciales),
                        headers: {
                            'Content-type': 'application/json'
                        }
                    };

                    const response = await fetch(`${url}/signup`, options); // No cambia, `/signup` es correcto
                    const datos = await response.json();
                    const { cancelForm } = getActions();
                    if (datos.msg) {
                        toast.error(datos.msg);
                    } else {
                        toast.success(datos.success);
                        const { access_token, user } = datos.datos;
                        setStore({
                            access_token,
                            current_user: user,
                            email: '',
                            password: '',
                            name: ''
                        });
                        sessionStorage.setItem('access_token', access_token);
                        sessionStorage.setItem('current_user', JSON.stringify(user));
                        cancelForm();
                    }

                } catch (error) {
                    console.log(error.message);
                }
            },

            logout: () => {
                if (sessionStorage.getItem('access_token')) {
                    setStore({
                        access_token: null,
                        current_user: null,
                        email: '',
                        password: ''
                    });
                    sessionStorage.removeItem('access_token');
                    sessionStorage.removeItem('current_user');
                    toast.success("Log out Successful");
                }
            },
			getReservation: async () => {
				try {
					const { access_token } = getStore()
					const url = '127.0.0.1:3000/reservations_queries/user_reservations';
					const options = {
						method: "GET",
						headers: {
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + access_token
						},
					}

					const response = await fetch(url, options)
					const datos = await response.json()
					setStore({ reservations: datos })
				} catch (error) {
					console.log(error.message)
				}

			}

        }
    };
};

export default getState;