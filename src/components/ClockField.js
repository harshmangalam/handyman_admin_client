import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";

export default function ClockField({ setTime, label, time }) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardTimePicker
        margin="normal"
        id="time-picker"
        label={label}
        variant="dialog"
        value={time}
        onChange={(t) => setTime(t)}
        KeyboardButtonProps={{
          "aria-label": "change time",
        }}
      />
    </MuiPickersUtilsProvider>
  );
}
