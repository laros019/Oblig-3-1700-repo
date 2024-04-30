package com.example.oblig31700ferdig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
public class controller {
    @Autowired
    private BillettRepository rep;

    private boolean validering(Billetter billett){
        String regexFornavn = "[a-zA-zæøåÆØÅ. \\-]{2,30}";
        String regexEtternavn = "[a-zA-zæøåÆØÅ. \\-]{2,30}";
        String regexEpost = "^(.+)@(\\S+)$";
        boolean fornavnOK = billett.getFornavn().matches(regexFornavn);
        boolean etternavnOK = billett.getEtternavn().matches(regexEtternavn);
        boolean epostOK = billett.getEpost().matches(regexEpost);
        boolean telefonOK = billett.getTelefon() >9999999 && billett.getTelefon() <100000000;//Validation this way because norwegian numbers never start with 0.
        boolean antallOK = billett.getAntall() > 0;

        if(fornavnOK && etternavnOK && epostOK && telefonOK && antallOK){
            return true;
        }
        return false;

    }

    @PostMapping("/lagre")
    public void lagreBillett(Billetter enBillett){
        if(validering(enBillett)) {
            rep.lagreEnBillett(enBillett);
        }
    }

    @GetMapping("/hent")
    public List<Billetter> hentBilletter(){
        return rep.hentAlleBilletter();
    }

    @DeleteMapping("/slett")
    public void slettBilletter(){
        rep.slettAlleBilletter();
    }
}
