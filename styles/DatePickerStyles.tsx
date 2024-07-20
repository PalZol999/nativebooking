import { StyleSheet } from 'react-native';

const DatePickerstyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
      },
      image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
      },
      datePickerContainer: {
        marginVertical: 20,
        alignItems: 'center',
      },
      button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
      },
      cardContainer: {
        marginVertical: 20,
        alignItems: 'center',
      },
      card: {
        width: '90%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: 'row',
      },
      coachImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
      },
      textContainer: {
        marginLeft: 20,
        justifyContent: 'center',
      },
      coachName: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      description: {
        marginTop: 5,
        color: '#6c757d',
      },
      addText: {
        color: '#007bff',
        marginTop: 10,
        fontSize: 16,
      },
      modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
      },
      modalContent: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
      },
      modalText: {
        fontSize: 18,
        marginBottom: 20,
      },
      confirmButton: {
        backgroundColor: '#28a745',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 10,
      },
      confirmButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
      closeButton: {
        backgroundColor: '#dc3545',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      },
      closeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
      images: {
        width: 100,
        height: 100,
        marginTop: 20,
      }
    });

export default DatePickerstyles;
