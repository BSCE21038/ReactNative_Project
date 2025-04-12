import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container1: {
    flex: 1,
  },
  firstScreen: {
    width: '100%',
    height: '100%', // Fix overflow issue
    resizeMode: 'cover',
  },
  logoContainer: {
    position: 'absolute',
    top: '50%', // Center vertically
    left: '50%', // Center horizontally
    transform: [{translateX: -120}, {translateY: -100}], // Adjust properly
    zIndex: 2,
  },
  firstLogo: {
    width: 250, // Increase size
    height: 130, // Make it taller for visibility
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 10,
    zIndex: 3,
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center',
  },
  // logo: {
  //   position: "absolute",
  //   top: 50,
  //   resizeMode: "contain",
  // },
  logo1: {
    zIndex: 3,
    alignSelf: 'center',
    position: 'absolute',
    top: 10,
    resizeMode: 'contain',
  },
  mainHeading: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 120, // Increase this to add space
    color: '#000',
  },
  loginText: {
    fontSize: 16,
    color: 'black',
  },
  loginLink: {
    fontSize: 18,
    color: '#5669FF',
  },
  orText: {
    fontSize: 16,
    color: 'black',
    marginVertical: 15,
    alignSelf: 'center',
  },
  forgotPasswordText: {
    fontSize: 16,
    color: 'black',
    marginTop: 10,
  },
  privacyPolicyLink: {
    fontSize: 12,
    marginBottom: -3,
    color: '#5669FF',
    fontWeight: 'bold',
  },
  welcomeText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFBA',
    textAlign: 'center',
    marginTop: 100,
  },
  button: {
    backgroundColor: '#6A5ACD',
    paddingVertical: 12,
    borderRadius: 20,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#6A5ACD',
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  socialButton: {
    flexDirection: 'row',
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    width: '100%',
    height: '8%',
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 12,
    borderRadius: 10,
    width: '80%',
    marginVertical: 10,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginVertical: 15,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#6A5ACD',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 150,
  },
  checkboxText: {
    fontSize: 15,
    color: 'black',
  },
  checkedBox: {
    backgroundColor: '#6A5ACD',
    zIndex: 3,
  },
  checkmark: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  backIcon: {
    position: 'absolute',
    top: 50,
    left: 10,
    zIndex: 10,
    color: 'black',
  },
  topNav: {
    height: 120,
    paddingHorizontal: 15,
    paddingTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    marginLeft: 15,
  },
  searchInput: {flex: 1, padding: 5, color: 'black'},
  categoryList: {paddingVertical: 15},
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  categoryText: {color: '#fff', marginLeft: 5, fontSize: 14},
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  sectionTitle: {fontSize: 18, fontWeight: 'bold'},
  seeAll: {color: '#007bff'},
  eventCard: {
    width: 180,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  eventImage: {width: '100%', height: 100},
  eventInfo: {padding: 10},
  eventDate: {fontSize: 12, color: 'gray'},
  eventTitle: {fontSize: 16, fontWeight: 'bold'},
  eventLocation: {fontSize: 12, color: 'gray'},
  eventFooter: {flexDirection: 'row', alignItems: 'center', marginTop: 5},
  eventAttendees: {marginLeft: 5, fontSize: 12},
  inviteCard: {
    backgroundColor: '#ffcc80',
    padding: 20,
    borderRadius: 10,
    margin: 15,
    alignItems: 'center',
  },
  inviteText: {fontSize: 16, fontWeight: 'bold'},
  inviteSubText: {fontSize: 14},
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  noResultsText: {
    fontSize: 16,
    color: 'gray',
  },
  eventDescription: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'justify',
    color: '#333',
    marginVertical: 5,
    paddingHorizontal: 10, // Adds padding for better readability
  },
  centeredRow: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    height: 80,
    textAlignVertical: 'top',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'cover',
  },
});
