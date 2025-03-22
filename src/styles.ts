import { StyleSheet } from "react-native";

export default StyleSheet.create({
  // containers
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderRadius:10,
  },
  firstScreen:{
    padding:5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',  
    marginTop: 20,
    justifyContent: 'center',
  },
  narratorContainer: {
    flexDirection: "row",
    justifyContent: "center", 
    marginVertical: 10,
    alignSelf: "center", 
  },
  selectedDay: {
    backgroundColor: '#3F414E',
    borderColor: '#3F414E',
  },
  // images & overlays
  logo: {
    position: "absolute",
    top: 50,
    resizeMode: "contain",
  },
  logo1: {
    zIndex: 3,
    position: "absolute",
    top:16,
    resizeMode: "contain",
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '65%',
    opacity: 0.19
  },
  bottomOverlay: {
    position: "absolute",
    bottom: -240,
    width: 395,
    height: 300,
    resizeMode: "contain",
    zIndex: 2,  
  },
  centerOverlay: {
    position: "absolute",
    width: 250,
    height: 250,
    resizeMode: "contain",
    zIndex: 2,  
  },
  centerImage: {
    marginBottom: 20
  },
  meditationImage: {
    width: 500,
    height: 390,
    resizeMode: "contain",
    opacity: 0.6,
    zIndex: 1,  
  },
  imageContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center", 
    marginVertical: 40,
    height: 300, 
    width: "100%", 
  },
  courseImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
    marginBottom: 20,
  },
  // Headings & Text
  mainHeading: {
    zIndex:1,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop:90,
  },
  heading: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#3F414E",
    textAlign: "left", 
    alignSelf: "flex-start", 
    marginLeft: 20, 
    marginBottom: 5,
    marginTop: 40
  },
  subHeading: {
    fontSize: 24,
    fontWeight: "normal",
    color: "#3F414E",
    textAlign: "left", 
    alignSelf: "flex-start", 
    marginLeft: 20, 
    marginBottom: 5,
  },
  reminderHeading: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#3F414E",
    textAlign: "left",
    alignSelf: "flex-start", 
    marginLeft: 20, 
    marginBottom: 5,
    marginTop: 40,
    width: "80%",
  },
  subText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#777',
    paddingHorizontal: 20,
    marginBottom: 20,
    width: '90%',  
    lineHeight: 30, 
  },
  loginText: {
    fontSize: 16,
    color: "black"
  },
  loginLink: {
    fontSize: 18,
    color: "#5669FF",
  },
  orText: {
    fontSize: 16,
    color: "black",
    marginVertical: 15
  },
  forgotPasswordText: {
    fontSize: 16,
    color: "black",
    marginTop: 10
  },
  privacyPolicyLink: {
    fontSize: 14,
    marginBottom:-3,
    color: "#5669FF",
    fontWeight: 'bold'
  },
  welcomeText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FFFFBA",
    textAlign: "center",
    marginTop: 100,
  },
  subTitle: {
    fontWeight: "normal",
    color: "#FFFFBA",
  },
  appName: {
    fontSize: 35,
    fontWeight: "normal",
    color: "#FFFFBA",
    textAlign: "center",
  },
  description: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    paddingHorizontal: 40,
    marginTop: 10,
    lineHeight: 24,
    width: '85%',
  },
  dailyThought: {
    backgroundColor: "#333242",
    padding: 5,
    borderRadius: 10,
    width: "80%",
    marginBottom: 10,
  },
  dailyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    marginTop: 10,
  },
  dailySubtext: {
    fontSize: 14,
    color: "#BBB",
  },
  listDescription: {
    fontSize: 16,
    color: "#A1A4B2", 
    textAlign: "left",
    alignSelf: "flex-start", 
    marginLeft: 20, 
    marginBottom: 5,
  },
  dayText: {
    fontSize: 16,
    color: '#3F414E',
  },
  selectedDayText: {
    color: '#fff',
  },
  noThanksText: {
    color: '#3F414E',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 120,
    fontWeight: "bold",
  },
  favoriteText: {
    marginLeft: 20,
    alignSelf: "flex-start", 
    fontSize: 14,
    color: "red",
  },
  narratorLabel: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    alignSelf: "flex-start",
    marginLeft: 20,
    marginBottom: 10
  },
  narratorOptionWrapper: {
    marginHorizontal: 15, 
  },
  narratorOption: {
    fontSize: 16,
    color: "gray",
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  sessionDuration: {
    fontSize: 14,
    color: "gray",
  },
  selectedVoice: {
    color: "blue",
    fontWeight: "bold",
  },
  // buttons
  button: {
    backgroundColor: '#6A5ACD',
    paddingVertical: 12,
    borderRadius: 20,
    width: '80%', 
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#6A5ACD'
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  socialButton: {
    flexDirection: 'row',
    backgroundColor: "black",
    paddingHorizontal: 20, 
    paddingVertical: 12,   
    borderRadius: 10,
    width: '80%',
    height: '8%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10
  },
  saveButton: {
    backgroundColor: "#6A5ACD",
    borderColor: "#6A5ACD",
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: "center",
    borderWidth: 2,
    width: '80%',  
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  getStartedButton: {
    backgroundColor: "#E6E7E9",
    borderColor: "#E6E7E9",
    width: "80%",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
    zIndex: 2, 
  },
  dayButton: {
    width: 45,
    height: 45,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#3F414E',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginTop: 10,
  },
  // input fields & checkboxes
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 12,
    borderRadius: 10,
    width: '80%',
    marginVertical: 10,
    fontSize: 16
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginVertical: 15
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#6A5ACD',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 150
  },
  checkboxText: {
    fontSize: 18,
    color: "black"
  },
  checkedBox: {
    backgroundColor: '#6A5ACD'
  },
  checkmark: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold'
  },

  //icons & navigation
  backIcon: {
    position: "absolute",
    top: 50,  
    left: 20,
    zIndex: 10, 
    color:"black",
  },
  playIcon: {
    width: 30,
    height: 30,
    marginTop: 5,
  },
  heartIcon: {
    position: "absolute",
    top: 50,  
    right: 20, 
    zIndex: 10,  
  },
  playIcon2: {
    marginRight: 10,
    resizeMode: "contain",
  },
  // list & cards
  listContainer: {
    paddingBottom: 20,
    paddingHorizontal: 10, 
  },
  categoryCard: {
    width: 150,
    borderRadius: 10,
    padding: 15,
    marginRight: 15,
    alignItems: "center",
  },
  categoryImage: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  dailyImage: {
    width: "100%",
    resizeMode: "cover",
  },
  // course details
  courseTitle: {
    marginLeft: 20,
    fontSize: 40,
    fontWeight: "bold",
    color: "#333",
    alignSelf: "flex-start", 
  },
  courseDescription: {
    fontSize: 18,
    color: "#666",
    marginVertical: 10,
    width: "90%",
  },
  courseCategory: {
    marginLeft: 20,
    fontSize: 16,
    color: "gray",
    textTransform: "uppercase",
    alignSelf: "flex-start", 
  },
  sessionItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15, 
    marginVertical: 5,
    backgroundColor: "#f4f4f4",
    borderRadius: 10,
    width: "100%", 
  },
  //separators
  separator: {
    height: 1, 
    backgroundColor: "#ddd", 
    width: "100%", 
    marginVertical: 5, 
  },
  /* Floating Elements */
  ellipse14: {
    position: "absolute",
    top: "35%",
    left: "10%",
    width: 10,
    height: 10,
    resizeMode: "contain",
  },
  ellipse15: {
    position: "absolute",
    top: "33%",
    left: "7%",
    width: 10,
    height: 10,
    resizeMode: "contain",
  },
  bigCloud: {
    position: "absolute",
    top: "40%",
    right: "1%",
    width: 120,
    height: 80,
    resizeMode: "contain",
    zIndex: 2,  
  },
  smallCloud: {
    position: "absolute",
    top: "36%",
    left: "1%",
    width: 70,
    height: 60,
    resizeMode: "contain",
    zIndex: 2, 
  },
  bigBird: {
    position: "absolute",
    top: "37%",
    right: "20%",
    width: 50,
    height: 50,
    resizeMode: "contain",
    zIndex: 2,  
  },
  smallBird: {
    position: "absolute",
    top: "45%",
    left: "15%",
    width: 30,
    height: 30,
    resizeMode: "contain",
    zIndex: 2, 
  },
});
