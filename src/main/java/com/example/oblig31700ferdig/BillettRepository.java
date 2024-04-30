package com.example.oblig31700ferdig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@Repository


public class BillettRepository {

    @Autowired
    private JdbcTemplate db;

    @PostMapping("/lagre")
    public void lagreEnBillett(Billetter innBillett){
        String sql = "INSERT INTO Billett (fornavn, etternavn, film, antall, telefon, epost) VALUES(?,?,?,?,?,?)";
        db.update(sql, innBillett.getFornavn(), innBillett.getEtternavn(), innBillett.getFilm(), innBillett.getAntall(),innBillett.getTelefon(), innBillett.getEpost());
    }
    @GetMapping("/hent")
    public List<Billetter> hentAlleBilletter(){
        String sql = "SELECT * FROM Billett ORDER BY etternavn, fornavn";
        List<Billetter> alleBilletter = db.query(sql, new BeanPropertyRowMapper<>(Billetter.class));
        return alleBilletter;
    }
    @GetMapping("/slett")
    public void slettAlleBilletter(){
        String sql = "DELETE FROM Billett";
        db.update(sql);
    }

}
