As an executive member of the National Junior College Strings Orchestra (NJCSO), I was responsible for managing the orchestra's instrument inventory. With a collection of over 30 instruments, tracking their whereabouts and managing student borrowing had become increasingly challenging.

I developed a solution that would streamline the instrument check-in/out process, providing clear visibility of which instruments were in storage and which were currently with students.

To ensure accessibility and ease of use, I created a web application that could be accessed by all orchestra members. The system implements a QR code-based verification process - students must scan instrument-specific QR codes and their designated storage zones using their phone cameras, ensuring physical presence during the check-in/out process.

<figure>
  <img src="/projects/njcso-tracker-1.png" alt="Logs generated and saved to Google Sheet">
  <figcaption>Logs generated and saved to Google Sheet</figcaption>
</figure>

To maintain simplicity for non-technical users while leveraging modern technology, I chose Google Sheets as the backend database. This familiar interface allows easy access to inventory status and transaction logs, while the web application automatically updates the spreadsheet with new check-in/out records and retrieves real-time inventory data.

<figure>
  <img src="/projects/njcso-tracker-2.png" alt="Loan status and whereabouts of instruments">
  <figcaption>Loan status and whereabouts of instruments</figcaption>
</figure>

Flow of the check-in/out process:

1. Student scans the QR code of the instrument they wish to borrow.
2. The system verifies the instrument's status.
3. The student is prompted to scan the QR code of the storage zone.
4. The system verifies the storage zone's status.
5. The system updates the inventory status and the transaction log.
